import * as yup from "yup";

export const createEventSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  location: yup.object().shape({
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    district: yup.string().required("District is required"),
    address: yup.string().required("Address is required"),
    latitude: yup.number().required("Latitude is required"),
    longitude: yup.number().required("Longitude is required"),
  }),
  ticketType: yup.object().shape({
    price: yup
      .number()
      .typeError("Price must be a number")
      .min(0, "Price cannot be negative")
      .required("Price is required"),
    quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .min(1, "Quantity must be at least 1")
      .required("Quantity is required"),
  }),
  category: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one category")
    .required("Category is required"),
  tags: yup.array().of(yup.string().required()).default([]),
  isonline: yup.boolean().default(false),
  media: yup.object().shape({
    mediaType: yup
      .string()
      .oneOf(["image", "video"])
      .required("Media type is required"),
    mediaUrl: yup.string().required("Media is required"),
  }),
  organizer: yup.string().optional(),
});

export type CreateEventSchema = Omit<
  yup.InferType<typeof createEventSchema>,
  "organizer"
> & {
  organizer?: string;
};
