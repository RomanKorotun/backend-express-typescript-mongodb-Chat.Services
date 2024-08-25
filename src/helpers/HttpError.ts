interface IListMessage {
  [key: number]: string;
}

interface ICustomError extends Error {
  status?: number;
}

const listMessage: IListMessage = {
  400: "Bad Request",
  401: "Unauthorize",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (
  status: number,
  message: string = listMessage[status]
): ICustomError => {
  const error: ICustomError = new Error(message);
  error.status = status;
  return error;
};
export default HttpError;
