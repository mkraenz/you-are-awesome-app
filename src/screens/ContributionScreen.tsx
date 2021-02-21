import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { v4 } from "uuid";
import Layout from "../components/common/Layout";
import OfflineNotice from "../components/common/OfflineNotice";
import SubmitMessageInputForm from "../components/contribution/ContributionInputForm";
import { Route } from "../navigation/Route";
import { submitMessage } from "../state/action-creators/contribute";
import { IMessageContent } from "../state/state/IMessage";
import { MapStateToProps } from "../state/state/MapStateToProps";
import { toIsoDateString } from "../utils/toTodayString";

interface StateProps {
    connectedToInternet: boolean;
}
interface DispatchProps {
    submitMessage: typeof submitMessage;
}
type Props = StateProps & DispatchProps;

const ContributionScreen: FC<Props> = ({
    connectedToInternet,
    submitMessage,
}) => {
    const { t } = useTranslation();
    const { navigate } = useNavigation();
    const gotoMyContributions = () => navigate(Route.MyContributions);
    const handleSubmit = (msg: IMessageContent) => {
        submitMessage({
            ...msg,
            id: v4(),
            isodate: toIsoDateString(new Date()),
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
        gotoMyContributions();
    };

    return (
        <Layout
            route={Route.Contribute}
            title={t(Route.Contribute)}
            appbarProps={{
                actionIcon: "view-list",
                onActionPress: gotoMyContributions,
            }}
        >
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
