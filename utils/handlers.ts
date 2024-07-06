import { ApiError } from "./types";

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

export const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === 'object' && 'data' in error) {
        const apiError = error as ApiError;
        if (Array.isArray(apiError.data?.detail)) {
            return apiError.data.detail.map((err: any) => `${err.loc.join(' -> ')}: ${err.msg}`).join(', ');
        }
        return apiError.data?.detail || 'An unexpected error occurred.';
    }
    return 'An unexpected error occurred.';
};

export function formatDateTime(dateTimeString: string) {
    const date = new Date(dateTimeString);

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
    });

    const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    return {formattedTime,formattedDate};
}

