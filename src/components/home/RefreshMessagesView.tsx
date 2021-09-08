import React, { FC, ReactNode, useEffect, useState } from "react";
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from "react-native";
import { Snackbar, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { Analytics } from "../../api/Analytics";
import { requestFetchMessages } from "../../state/action-creators/requestFetchMessages";
import { MapStateToProps } from "../../state/state/MapStateToProps";
import { useTranslation } from "../../utils/useTranslation";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    scrollView: {
        flex: 1,
    },
});

interface Props {
    requestFetchMessages: (now: Date) => void;
    refreshing: boolean;
    internetConnected: boolean;
    children: ReactNode;
}

const RefreshMessagesView: FC<Props> = ({
    requestFetchMessages,
    children,
    refreshing,
    internetConnected,
}) => {
    useEffect(() => {
        requestFetchMessages(new Date());
    }, [requestFetchMessages]);
    const [snackbarShown, showSnackbar] = useState(false);
    const { t } = useTranslation();
    const toggleSnackbar = () => showSnackbar(!snackbarShown);
    const theme = useTheme();

    const handleRefresh = () => {
        if (!internetConnected) {
            toggleSnackbar();
            return;
        }
        requestFetchMessages(new Date());
        Analytics.logManualRefresh();
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                {children}
                <Snackbar
                    visible={snackbarShown}
                    onDismiss={toggleSnackbar}
                    duration={7000}
                    style={{ backgroundColor: theme.colors.error }}
                >
                    {t("home:fetchFailedBecauseOffline")}
                </Snackbar>
            </ScrollView>
        </SafeAreaView>
    );
};

const mapStateToProps: MapStateToProps<
    Pick<Props, "refreshing" | "internetConnected">
> = (state) => ({
    refreshing: state.messages.refreshing,
    internetConnected: state.network.connected,
});

const mapDispatchToProps: Pick<Props, "requestFetchMessages"> = {
    requestFetchMessages,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RefreshMessagesView);
