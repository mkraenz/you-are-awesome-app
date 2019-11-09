import { Notifications } from "expo";
import {
    atPostDateAndScheduledTime,
    maybeScheduleNotifications,
    scheduledTimePassed,
    scheduleNotification,
    toNotification,
} from "../../../src/redux/sagas/maybeScheduleNotificationsSaga";
import { mock } from "../../helpers/mocks";

afterEach(() => jest.resetAllMocks());

describe("atPostDateAndScheduledTime()", () => {
    it("works for isodate with only date", () => {
        const result = atPostDateAndScheduledTime(
            { isodate: "2018-01-12" },
            new Date("2010-07-29T15:03:56.123Z")
        );
        expect(result).toEqual(new Date("2018-01-12T15:03:56.123Z").getTime());
    });

    it("works for isodate with datetime", () => {
        const result = atPostDateAndScheduledTime(
            { isodate: "2018-01-12Z09:12:32.987Z" },
            new Date("2010-07-29T15:03:56.123Z")
        );
        expect(result).toEqual(new Date("2018-01-12T15:03:56.123Z").getTime());
    });
});

describe("todayButScheduledTimePassed()", () => {
    it("returns true if (date, time) has passed", () => {
        const result = scheduledTimePassed(
            { isodate: "2018-01-01" },
            new Date("2010-01-01T08:03:56.123Z"),
            new Date("2018-01-01T15:03:56.123Z")
        );
        expect(result).toBe(true);
    });

    it("returns true if (date, time) is now", () => {
        const result = scheduledTimePassed(
            { isodate: "2018-01-01" },
            new Date("2018-01-01T15:03:56.123Z"),
            new Date("2018-01-01T15:03:56.123Z")
        );
        expect(result).toBe(true);
    });

    it("returns false if (date, time) has not yet passed", () => {
        const result = scheduledTimePassed(
            { isodate: "2018-01-01" },
            new Date("2018-01-01T15:03:56.123Z"),
            new Date("2010-01-01T08:03:56.123Z")
        );
        expect(result).toBe(false);
    });

    it("returns true if (date, time) has passed | date is datetime", () => {
        const result = scheduledTimePassed(
            { isodate: "2018-01-01T09:12:34.456Z" },
            new Date("2010-01-01T08:03:56.123Z"),
            new Date("2018-01-01T15:03:56.123Z")
        );
        expect(result).toBe(true);
    });

    it("returns true if (date, time) is now | date is datetime", () => {
        const result = scheduledTimePassed(
            { isodate: "2018-01-01T09:12:34.456Z" },
            new Date("2018-01-01T15:03:56.123Z"),
            new Date("2018-01-01T15:03:56.123Z")
        );
        expect(result).toBe(true);
    });

    it("returns false if (date, time) has not yet passed | date is datetime", () => {
        const result = scheduledTimePassed(
            { isodate: "2018-01-01T09:12:34.456Z" },
            new Date("2018-01-01T15:03:56.123Z"),
            new Date("2010-01-01T08:03:56.123Z")
        );
        expect(result).toBe(false);
    });
});

describe("toNotification()", () => {
    it("returns correctly formatted message", () => {
        const result = toNotification({
            author: "my-author",
            country: "my-country",
            text: "BAMS BAMS BAMS",
        });
        expect(result).toEqual({
            title: "my-author from my-country",
            body: "BAMS BAMS BAMS",
        });
    });
});

describe("scheduleNotification()", () => {
    it("works", async () => {
        const spy = jest
            .spyOn(Notifications, "scheduleLocalNotificationAsync")
            .mockImplementation(() =>
                Promise.resolve("scheduled-notification-id")
            );
        const post = mock.posts[0];
        const scheduledTime = new Date("2010-11-09T08:03:56.123Z");

        await scheduleNotification(post, scheduledTime);

        expect(spy).toBeCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(
            {
                body: "text-1",
                title: "author-1 from country-1",
            },
            { time: new Date("2029-01-01T08:03:56.123Z").getTime() }
        );
    });

    it("does nothing if post is old", async () => {
        const oldDate = "2000-01-01";
        const post = {
            author: "author-1",
            country: "country-1",
            id: "id-1",
            text: "text-1",
            isodate: oldDate,
        };
        const spy = jest
            .spyOn(Notifications, "scheduleLocalNotificationAsync")
            .mockImplementation(() =>
                Promise.resolve("scheduled-notification-id")
            );
        const scheduledTime = new Date("2010-01-01T08:03:56.123Z");

        await scheduleNotification(post, scheduledTime);

        expect(spy).not.toBeCalled();
    });
});

describe("maybeScheduleNotifications()", () => {
    it("maybeScheduleNotifications() works", async () => {
        const spy = jest
            .spyOn(Notifications, "scheduleLocalNotificationAsync")
            .mockImplementation(() =>
                Promise.resolve("scheduled-notification-id")
            );
        const cancelSpy = jest
            .spyOn(Notifications, "cancelAllScheduledNotificationsAsync")
            .mockImplementation(() => Promise.resolve());
        const scheduledTime = new Date("2010-01-01T23:59:59.999Z");

        await maybeScheduleNotifications(true, scheduledTime, mock.posts);

        expect(cancelSpy).toBeCalledTimes(1);
        expect(spy).toBeCalledTimes(3);
        expect(spy).toHaveBeenNthCalledWith(
            1,
            {
                body: "text-1",
                title: "author-1 from country-1",
            },
            { time: new Date("2029-01-01T23:59:59.999Z").getTime() }
        );
        expect(spy).toHaveBeenNthCalledWith(
            2,
            {
                body: "text-2",
                title: "author-2 from country-2",
            },
            { time: new Date("2029-01-02T23:59:59.999Z").getTime() }
        );
        expect(spy).toHaveBeenNthCalledWith(
            3,
            {
                body:
                    "A new awesome message! To get tomorrow's message via notification as usual, simply open your app once.",
                title: "Action requested. Click to open",
            },
            {
                repeat: "day",
                time: new Date("2029-01-03T23:59:59.999Z").getTime(),
            }
        );
    });

    it("only cancels notifications if notifications disabled", async () => {
        const enabled = false;
        const scheduleSpy = jest
            .spyOn(Notifications, "scheduleLocalNotificationAsync")
            .mockImplementation(() =>
                Promise.resolve("scheduled-notification-id")
            );
        const cancelSpy = jest
            .spyOn(Notifications, "cancelAllScheduledNotificationsAsync")
            .mockImplementation(() => Promise.resolve());
        const scheduledTime = new Date("2010-01-01T08:03:56.123Z");

        await maybeScheduleNotifications(enabled, scheduledTime, mock.posts);

        expect(cancelSpy).toBeCalledTimes(1);
        expect(scheduleSpy).not.toBeCalled();
    });
});
