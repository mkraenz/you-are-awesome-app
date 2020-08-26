import { IMessage } from "../state/IMessage";

export type IPersistFavoritesState = Readonly<{
    messages: IMessage[];
}>;
