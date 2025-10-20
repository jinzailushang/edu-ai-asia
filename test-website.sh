#!/bin/bash

# Website Testing Script for edu-ai.asia
# This script performs comprehensive testing of the domain sales website

echo "=================================="
echo "Website Testing Script"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
PASSED=0
FAILED=0
WARNINGS=0

# Function to print test result
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASSED${NC}: $2"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAILED${NC}: $2"
        ((FAILED++))
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠ WARNING${NC}: $1"
    ((WARNINGS++))
}

echo "1. Build Tests"
echo "-----------------------------------"

# Test 1: Build succeeds
npm run build > /dev/null 2>&1
print_result $? "Project builds successfully"

# Test 2: Check if dist directory exists
if [ -d "dist" ]; then
    print_result 0 "Dist directory created"
else
    print_result 1 "Dist directory not found"
fi

echo ""
echo "2. Page Generation Tests"
echo "-----------------------------------"

# Test 3-5: Check critical pages exist
pages=(
    "dist/index.html:Chinese homepage"
    "dist/en/index.html:English homepage"
    "dist/sitemap.xml:Sitemap"
    "dist/domains/edu-ai-chat/index.html:Domain detail page (Chinese)"
    "dist/en/domains/edu-ai-chat/index.html:Domain detail page (English)"
)

for page in "${pages[@]}"; do
    IFS=':' read -r path desc <<< "$page"
    if [ -f "$path" ]; then
        print_result 0 "$desc exists"
    else
        print_result 1 "$desc missing"
    fi
done

echo ""
echo "3. SEO Meta Tags Tests"
echo "-----------------------------------"

# Test 6-10: Check SEO elements in homepage
if [ -f "dist/index.html" ]; then
    grep -q '<title>' dist/index.html
    print_result $? "Homepage has title tag"
    
    grep -q 'meta name="description"' dist/index.html
    print_result $? "Homepage has meta description"
    
    grep -q 'meta name="keywords"' dist/index.html
    print_result $? "Homepage has meta keywords"
    
    grep -q 'property="og:' dist/index.html
    print_result $? "Homepage has Open Graph tags"
    
    grep -q 'name="twitter:' dist/index.html
    print_result $? "Homepage has Twitter Card tags"
fi

echo ""
echo "4. Multilingual Tests"
echo "-----------------------------------"

# Test 11-13: Check hreflang tags
if [ -f "dist/index.html" ]; then
    grep -q 'hreflang="zh"' dist/index.html
    print_result $? "Chinese hreflang tag present"
    
    grep -q 'hreflang="en"' dist/index.html
    print_result $? "English hreflang tag present"
    
    grep -q 'hreflang="x-default"' dist/index.html
    print_result $? "Default hreflang tag present"
fi

# Test 14: Check language switcher
if [ -f "dist/index.html" ]; then
    grep -q 'language-switcher' dist/index.html
    print_result $? "Language switcher component present"
fi

echo ""
echo "5. Structured Data Tests"
echo "-----------------------------------"

# Test 15-16: Check Schema.org markup
if [ -f "dist/index.html" ]; then
    grep -q 'application/ld+json' dist/index.html
    print_result $? "Structured data (JSON-LD) present on homepage"
    
    grep -q '"@type":"Organization"' dist/index.html
    print_result $? "Organization schema present"
fi

if [ -f "dist/domains/edu-ai-chat/index.html" ]; then
    grep -q '"@type":"Product"' dist/domains/edu-ai-chat/index.html
    print_result $? "Product schema present on domain detail page"
    
    grep -q '"@type":"BreadcrumbList"' dist/domains/edu-ai-chat/index.html
    print_result $? "Breadcrumb schema present on domain detail page"
fi

echo ""
echo "6. Sitemap Tests"
echo "-----------------------------------"

# Test 17-19: Validate sitemap
if [ -f "dist/sitemap.xml" ]; then
    grep -q '<?xml version="1.0"' dist/sitemap.xml
    print_result $? "Sitemap has valid XML declaration"
    
    grep -q '<urlset' dist/sitemap.xml
    print_result $? "Sitemap has urlset element"
    
    grep -q 'edu-ai.asia/domains/' dist/sitemap.xml
    print_result $? "Sitemap includes domain detail pages"
    
    grep -q 'xhtml:link rel="alternate"' dist/sitemap.xml
    print_result $? "Sitemap includes multilingual alternate links"
fi

echo ""
echo "7. Accessibility Tests"
echo "-----------------------------------"

# Test 20-22: Check accessibility features
if [ -f "dist/index.html" ]; then
    grep -q 'aria-label' dist/index.html
    print_result $? "ARIA labels present"
    
    grep -q 'role=' dist/index.html
    print_result $? "ARIA roles present"
    
    grep -q '跳转到主内容\|skip.*content' dist/index.html
    print_result $? "Skip to content link present"
fi

echo ""
echo "8. Contact Information Tests"
echo "-----------------------------------"

# Test 23-25: Check contact elements
if [ -f "dist/index.html" ]; then
    grep -q 'tel:13352963461' dist/index.html
    print_result $? "Phone number link present"
    
    grep -q '858005598@qq.com' dist/index.html
    print_result $? "Email address present"
    
    grep -q 'better99825168' dist/index.html
    print_result $? "WeChat ID present"
fi

echo ""
echo "9. Responsive Design Tests"
echo "-----------------------------------"

# Test 26-27: Check responsive meta tags
if [ -f "dist/index.html" ]; then
    grep -q 'viewport' dist/index.html
    print_result $? "Viewport meta tag present"
    
    grep -q 'MobileOptimized' dist/index.html
    print_result $? "Mobile optimization meta tags present (Baidu)"
fi

echo ""
echo "10. Performance Tests"
echo "-----------------------------------"

# Test 28-29: Check asset optimization
if [ -f "dist/index.html" ]; then
    # Check if CSS is minified (no newlines in CSS files)
    if ls dist/_astro/*.css 1> /dev/null 2>&1; then
        print_result 0 "CSS files generated"
    else
        print_warning "No CSS files found in _astro directory"
    fi
    
    # Check if HTML is minified (single line)
    lines=$(wc -l < dist/index.html)
    if [ $lines -lt 100 ]; then
        print_result 0 "HTML appears to be minified"
    else
        print_warning "HTML may not be fully minified ($lines lines)"
    fi
fi

echo ""
echo "=================================="
echo "Test Summary"
echo "=================================="
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All critical tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please review the results above.${NC}"
    exit 1
fi
