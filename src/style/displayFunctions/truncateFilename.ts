/**
 * truncateFilename reduces the length of the filename (without the file extension)
 * to the specified limit and appends "..." if the original name was longer.
 *
 * @param {string} filename - The original filename that will be truncated.
 * @param {number} [limit=20] - The maximum length for the filename (not including the file extension).
 *
 * @return {string} - The truncated filename with the file extension.
 */
export const truncateFilename = (filename: string, limit = 20): string => {
    const name = filename.split('.').slice(0, -1).join('.');
    const extension = filename.split('.').pop();

    return `${name.substring(0, limit)}${name.length > limit ? '...' : ''}.${extension}`;
};
