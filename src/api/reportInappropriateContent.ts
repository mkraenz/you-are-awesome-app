export const reportInappropriateContent = ({
    messageId,
    reason,
    comment,
}: {
    messageId: string;
    reason: string;
    comment: string;
}) => {
    console.log("reached api", { messageId, reason, comment });
    // TODO fetch stuff
};
