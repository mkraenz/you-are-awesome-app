import i18next from "i18next";
import React from "react";
import "react-native";
import { Provider } from "react-redux";
// Note: test renderer must be required after react-native.
import renderer, { act } from "react-test-renderer";
import createMockStore from "redux-mock-store";
import { Route } from "../../src/navigation/Route";
import FavoritesScreen from "../../src/screens/FavoritesScreen";
import { IState } from "../../src/state/state/IState";
import { Pick2 } from "../../src/utils/ts/Pick2";
import LocalizedMockPaperProvider from "../helpers/LocalizedMockPaperProvider";
import MockedNavigator from "../helpers/MockedNavigation";
import { mock } from "../helpers/mocks";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

const ConfiguredFavorites = () => (
    <LocalizedMockPaperProvider>
        <MockedNavigator component={FavoritesScreen} />
    </LocalizedMockPaperProvider>
);

it("renders special message on empty list", async () => {
    const store = createMockStore<Pick2<IState, "favorites", "messages">>([])({
        favorites: { messages: [] },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <ConfiguredFavorites />
            </Provider>
        )
        .toJSON();
    await act(async () => {});

    expect(tree).toMatchSnapshot();
    const treeStr = JSON.stringify(tree);
    expect(treeStr).toContain("Double tap");
    expect(treeStr).toContain(i18next.t(Route.Home));
    expect(treeStr).toContain(
        i18next.t("favoritesToRoute", { route: Route.Home })
    );
});

it("renders the list", async () => {
    const store = createMockStore<Pick2<IState, "favorites", "messages">>([])({
        favorites: { messages: mock.messages },
    });

    const tree = renderer
        .create(
            <Provider store={store}>
                <ConfiguredFavorites />
            </Provider>
        )
        .toJSON();
    await act(async () => {});

    expect(tree).toMatchSnapshot();
    const treeStr = JSON.stringify(tree);
    const msg0 = mock.messages[0];
    expect(treeStr).toContain(msg0.author);
    expect(treeStr).toContain(msg0.isodate);
    expect(treeStr).toContain(msg0.text);
    expect(treeStr).toContain(msg0.country);
    const msg1 = mock.messages[1];
    expect(treeStr).toContain(msg1.author);
    expect(treeStr).toContain(msg1.isodate);
    expect(treeStr).toContain(msg1.text);
    expect(treeStr).toContain(msg1.country);
});
