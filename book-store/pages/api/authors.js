import { getAllAuthors } from "@/helpers/api-utils";

const authors=getAllAuthors();
export default function handler(req, res) {
    res.status(200).json(authors);
}