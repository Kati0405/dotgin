import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().trim().min(2, "Вкажіть ім'я (мінімум 2 символи)"),
  surname: z.string().trim().min(2, "Вкажіть прізвище (мінімум 2 символи)"),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s()-]{6,}$/, "Введіть коректний номер телефону"),
  city: z.string().trim().min(2, "Вкажіть місто"),
  branch: z.string().trim().min(3, "Вкажіть відділення або поштомат"),
  quantity: z.coerce.number().int().min(1).max(6),
  comment: z.string().trim().optional().default(""),
});

export type OrderInput = z.infer<typeof orderSchema>;
