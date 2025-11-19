const fs = require('fs');
const report = JSON.parse(fs.readFileSync('link-check-report.json', 'utf8'));

// Count occurrences of each broken link
const linkCounts = {};
for (const file in report.brokenLinks) {
  report.brokenLinks[file].forEach(link => {
    linkCounts[link] = (linkCounts[link] || 0) + 1;
  });
}

// Sort by count
const sortedLinks = Object.entries(linkCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30);

console.log('\n=== Top 30 Most Common Broken Links ===\n');
sortedLinks.forEach(([link, count]) => {
  console.log(`${count}x - ${link}`);
});

console.log(`\n=== Summary ===`);
console.log(`Total unique broken links: ${Object.keys(linkCounts).length}`);
console.log(`Total broken link occurrences: ${report.brokenLinksCount}`);
console.log(`Files affected: ${report.filesWithBrokenLinks}`);
