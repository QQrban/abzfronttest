import * as yup from "yup";

const SUPPORTED_FORMATS = ["jpg", "jpeg"];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const validateForm = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be not more than 60 characters"),

  email: yup
    .string()
    .required("Email is required")
    .matches(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      "Invalid email address (example@gmail.com)"
    )
    .email("Invalid email address (example@gmail.com)"),

  phone: yup
    .string()
    .required("Phone is required")
    .matches(
      /^\+380\d*$/,
      "Phone must start with +380 and contain 9 digits"
    ),

  position_id: yup
    .number()
    .required("Position is required")
    .min(1, "Select a position"),

  image: yup
    .mixed()
    .required("Image is required")
    .test(
      "fileFormatAndSize",
      "Unsupported file (jpeg/jpg) or too large (max 5MB)",
      (value) => {
        if (!(value instanceof File)) return false;

        const ext = value.name.split(".").pop()?.toLowerCase();
        const isSupported = ext ? SUPPORTED_FORMATS.includes(ext) : false;
        const isSizeOk = value.size <= MAX_FILE_SIZE;

        return isSupported && isSizeOk;
      }
    )
    .test(
      "min-dimensions",
      "Image must be at least 70x70 pixels",
      async (value) => {
        if (!(value instanceof File)) return false;

        const dimensions = await getImageDimensions(value);
        return dimensions.width >= 70 && dimensions.height >= 70;
      }
    ),
});

const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };

      img.onerror = reject;
      img.src = reader.result as string;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
