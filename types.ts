import { z } from "zod"
export const Productschema = z.object({
    name: z.string(),
    price: z.number(),
})

export type Products = z.infer<typeof Productschema>;

export const RfidSchema = z.object({
    rfidID: z.string(),
    productID: z.string(),
})

export type Rfid = z.infer<typeof RfidSchema>;