import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { v4 } from "uuid";
import Layout from "../components/common/Layout";
import OfflineNotice from "../components/common/OfflineNotice";
import SubmitMessageInputForm from "../components/contribution/AddPostInputs";
import { Route } from "../navigation/Route";
import { submitMessage } from "../state/action-creators/addPost";
import { IMessage, IMessageContent } from "../state/state/IPost";
import { MapStateToProps } from "../state/state/MapStateToProps";

interface StateProps {
    connectedToInternet: boolean;
}
interface DispatchProps {
    submitMessage: (message: IMessage) => void;
}
type Props = StateProps & DispatchProps;

const ContributionScreen: FC<Props> = ({
    connectedToInternet,
    submitMessage,
}) => {
    const { t } = useTranslation();
    const handleSubmit = (msg: IMessageContent) => {
        submitMessage({
            ...msg,
            id: v4(),
        });
        const stayTuned = t("contributionStayTuned");
        Alert.alert(
            t("contributionThanks"),
            `${t("contributionMember")}${msg.text}${stayTuned}`,
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
            <SubmitMessageInputForm handleSubmit={handleSubmit} />
        </Layout>
    );
};

const mapStateToProps: MapStateToProps<StateProps> = (state) => ({
    connectedToInternet: state.network.connected,
});
const mapDispatchToProps: DispatchProps = { submitMessage };

export default connect(mapStateToProps, mapDispatchToProps)(ContributionScreen);
