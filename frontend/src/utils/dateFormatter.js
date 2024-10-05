export default function dateFormatter(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
    return formattedDate;
}
