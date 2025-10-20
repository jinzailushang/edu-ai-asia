#!/bin/bash

# Lighthouse Performance Testing Script
# Tests website performance, accessibility, SEO, and best practices

echo "=================================="
echo "Lighthouse Performance Testing"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if lighthouse is installed
if ! command -v lighthouse &> /dev/null; then
    echo -e "${YELLOW}Lighthouse is not installed.${NC}"
    echo "Installing Lighthouse globally..."
    npm install -g lighthouse
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install Lighthouse${NC}"
        exit 1
    fi
fi

# Check if site is built
if [ ! -d "dist" ]; then
    echo -e "${YELLOW}Building site first...${NC}"
    npm run build
fi

# Start preview server in background
echo -e "${BLUE}Starting preview server...${NC}"
npm run preview &
SERVER_PID=$!

# Wait for server to start
echo "Waiting for server to start..."
sleep 5

# Test URL
URL="http://localhost:4321"

echo ""
echo -e "${BLUE}Running Lighthouse tests...${NC}"
echo "This may take a few minutes..."
echo ""

# Create reports directory
mkdir -p lighthouse-reports

# Run Lighthouse for homepage (Chinese)
echo "Testing: Homepage (Chinese)"
lighthouse $URL \
  --output=html \
  --output=json \
  --output-path=./lighthouse-reports/homepage-zh \
  --chrome-flags="--headless" \
  --quiet

# Run Lighthouse for homepage (English)
echo "Testing: Homepage (English)"
lighthouse $URL/en/ \
  --output=html \
  --output=json \
  --output-path=./lighthouse-reports/homepage-en \
  --chrome-flags="--headless" \
  --quiet

# Run Lighthouse for domain detail page
echo "Testing: Domain Detail Page"
lighthouse $URL/domains/edu-ai-chat/ \
  --output=html \
  --output=json \
  --output-path=./lighthouse-reports/domain-detail \
  --chrome-flags="--headless" \
  --quiet

# Kill preview server
kill $SERVER_PID

echo ""
echo -e "${GREEN}✓ Lighthouse tests completed!${NC}"
echo ""
echo "Reports saved to: ./lighthouse-reports/"
echo ""
echo "View reports:"
echo "  - Homepage (Chinese): lighthouse-reports/homepage-zh.report.html"
echo "  - Homepage (English): lighthouse-reports/homepage-en.report.html"
echo "  - Domain Detail: lighthouse-reports/domain-detail.report.html"
echo ""

# Extract scores from JSON reports
echo "=================================="
echo "Performance Scores Summary"
echo "=================================="
echo ""

extract_scores() {
    local file=$1
    local page=$2
    
    if [ -f "$file" ]; then
        local perf=$(grep -o '"performance":[0-9.]*' "$file" | head -1 | cut -d':' -f2)
        local acc=$(grep -o '"accessibility":[0-9.]*' "$file" | head -1 | cut -d':' -f2)
        local bp=$(grep -o '"best-practices":[0-9.]*' "$file" | head -1 | cut -d':' -f2)
        local seo=$(grep -o '"seo":[0-9.]*' "$file" | head -1 | cut -d':' -f2)
        
        # Convert to percentage
        perf=$(echo "$perf * 100" | bc)
        acc=$(echo "$acc * 100" | bc)
        bp=$(echo "$bp * 100" | bc)
        seo=$(echo "$seo * 100" | bc)
        
        echo "$page:"
        echo "  Performance:     ${perf%.*}%"
        echo "  Accessibility:   ${acc%.*}%"
        echo "  Best Practices:  ${bp%.*}%"
        echo "  SEO:             ${seo%.*}%"
        echo ""
    fi
}

extract_scores "lighthouse-reports/homepage-zh.report.json" "Homepage (Chinese)"
extract_scores "lighthouse-reports/homepage-en.report.json" "Homepage (English)"
extract_scores "lighthouse-reports/domain-detail.report.json" "Domain Detail Page"

echo "=================================="
echo ""
echo -e "${BLUE}Open HTML reports in your browser to see detailed results.${NC}"
echo ""
