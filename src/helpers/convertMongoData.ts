// convert T data to T data with id is string
export const convertMongoData = <T>(data: T): T & { id: string } => {
    const { _id, ...rest } = data as any;
    return { ...rest, id: String(_id) };
};
