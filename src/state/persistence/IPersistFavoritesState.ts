import { MessageWithDate } from "../state/IMessage";

export type IPersistFavoritesState = Readonly<{
    messages: MessageWithDate[];
}>;
