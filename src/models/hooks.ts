import { ICustomDocument } from "./User.js";

type UpdateUser = Partial<ICustomDocument>;

interface SettingsContext {
  options: {
    new: boolean;
    runValidators: boolean;
  };
}

interface ICustomError extends Error {
  status?: number;
}

export const handleSaveError = (
  error: ICustomError,
  data: ICustomDocument,
  callback: () => void
) => {
  error.status = 400;
  callback();
};

export const handleAddSettings = function (
  this: SettingsContext,
  callback: () => void
) {
  this.options.new = true;
  this.options.runValidators = true;
  callback();
};

export const handleFindOneAndUpdateError = (
  error: ICustomError,
  data: UpdateUser,
  callback: () => void
) => {
  error.status = 400;
  callback();
};
