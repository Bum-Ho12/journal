// Purpose: Contains utility functions for handling data.
export function getFirstParagraph(content: string): string {
    // Split content into paragraphs based on common patterns
    const paragraphs = content.split(/[\n\r]+/);
    // Find the first non-empty paragraph
    for (const paragraph of paragraphs) {
        const trimmedParagraph = paragraph.trim();
        if (trimmedParagraph.length > 0) {
            return trimmedParagraph;
        }
    }
    return content;
}