import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { v4 } from "uuid";
import Layout from "../components/common/Layout";
import AddPostInput from "../components/contribution/AddPostInputs";
import OfflineNotice from "../components/common/OfflineNotice";
import { Route } from "../navigation/Route";
import { addPost } from "../state/action-creators/addPost";
import { IPost, IPostContent } from "../state/state/IPost";
import { MapStateToProps } from "../state/state/MapStateToProps";

interface StateProps {
    connectedToInternet: boolean;
}
interface DispatchProps {
    addPost: (post: IPost) => void;
}
type Props = StateProps & DispatchProps;

const ContributionScreen: FC<Props> = ({ connectedToInternet, addPost }) => {
    const { t } = useTranslation();
    const handleSubmit = (post: IPostContent) => {
        addPost({
            ...post,
            id: v4(),
        });
        const stayTuned = t("contributionStayTuned");
        Alert.alert(
            t("contributionThanks"),
            `${t("contributionMember")}${post.text}${stayTuned}`,
            [
                {
                    text: t("contributionAlertButton"),
                },
            ]
        );
    };

    return (
        <Layout route={Route.Contribute}>
            {!connectedToInternet && <OfflineNotice />}
            <AddPostInput handleSubmit={handleSubmit} />
        </Layout>
    );
};

const mapStateToProps: MapStateToProps<StateProps> = (state) => ({
    connectedToInternet: state.network.connected,
});
const mapDispatchToProps: DispatchProps = { addPost };

export default connect(mapStateToProps, mapDispatchToProps)(ContributionScreen);
