export type File = {
    uploaded: string,
    filename: string,
    url: string,
    id?: string
    filetype?: string,
    tags?: string[],
    updated?: string,
    deleted?: string,
}

export const isValidFile = (file: Partial<File> | null): file is File => {
    return !!file &&
        typeof file.uploaded === 'string' &&
        typeof file.filename === 'string' &&
        typeof file.url === 'string';
}
