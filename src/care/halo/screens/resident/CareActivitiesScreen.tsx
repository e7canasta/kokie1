import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "../../icons/ChevronLeftIcon";
import { careActivitiesByTimeRange, timeRangeTabs } from "../../domain/overview";
import type { CareActivity, TimeRangeTab } from "../../types/resident.types";

export default function CareActivitiesScreen() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TimeRangeTab>(timeRangeTabs[0]);
    const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

    const currentActivities = useMemo(() => {
        return careActivitiesByTimeRange[activeTab];
    }, [activeTab]);

    const handleBack = (): void => {
        navigate(`/resident/${id}`);
    };

    const toggleExpand = (activity: string): void => {
        setExpandedActivity(expandedActivity === activity ? null : activity);
    };

    // Calcular totales
    const totals = useMemo(() => {
        return currentActivities.reduce(
            (acc, activity) => {
                const parseTime = (time: string): number => {
                    if (time.includes("h")) {
                        return parseFloat(time) * 60; // Convertir horas a minutos
                    }
                    return parseFloat(time) || 0;
                };

                const parseTimeString = (timeStr: string): number => {
                    const match = timeStr.match(/([\d.]+)\s*(min|h)/);
                    if (!match) return 0;
                    const value = parseFloat(match[1]);
                    return match[2] === "h" ? value * 60 : value;
                };

                return {
                    initiated: acc.initiated + parseTimeString(activity.initiated),
                    uninitiated: acc.uninitiated + parseTimeString(activity.uninitiated),
                    total: acc.total + parseTimeString(activity.total),
                };
            },
            { initiated: 0, uninitiated: 0, total: 0 }
        );
    }, [currentActivities]);

    const formatTime = (minutes: number): string => {
        if (minutes >= 60) {
            const hours = Math.floor(minutes / 60);
            const mins = Math.round(minutes % 60);
            return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
        }
        return `${Math.round(minutes)} min`;
    };

    return (
        <div style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            minHeight: "100vh",
            background: "#F6F5F3",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
        }}>
            {/* Header */}
            <div style={{
                background: "#FFFFFF",
                padding: "12px 20px",
                borderBottom: "1px solid #E8E8E8",
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexShrink: 0,
            }}>
                <button
                    onClick={handleBack}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 4,
                        color: "#333",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <ChevronLeftIcon />
                </button>
                <h1 style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#1A1A1A",
                    margin: 0,
                    flex: 1,
                }}>
                    Care Activities
                </h1>
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px 16px",
            }}>
                {/* Time Range Tabs */}
                <div style={{
                    display: "flex",
                    background: "#F3F3F3",
                    borderRadius: 25,
                    padding: 3,
                    marginBottom: 24,
                }}>
                    {timeRangeTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setExpandedActivity(null);
                            }}
                            style={{
                                flex: 1,
                                padding: "10px 0",
                                border: "none",
                                borderRadius: 22,
                                fontSize: 13,
                                fontWeight: activeTab === tab ? 600 : 500,
                                cursor: "pointer",
                                background: activeTab === tab ? "#FFFFFF" : "transparent",
                                color: activeTab === tab ? "#1A1A1A" : "#888",
                                boxShadow: activeTab === tab ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                                transition: "all 0.2s ease",
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Summary Card */}
                <div style={{
                    background: "linear-gradient(135deg, #2E7D6F, #1B5E50)",
                    borderRadius: 16,
                    padding: "20px",
                    marginBottom: 24,
                    color: "#FFFFFF",
                }}>
                    <div style={{
                        fontSize: 13,
                        opacity: 0.9,
                        marginBottom: 8,
                    }}>
                        Total Time - {activeTab}
                    </div>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 16,
                        marginTop: 12,
                    }}>
                        <div>
                            <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 4 }}>Initiated</div>
                            <div style={{ fontSize: 18, fontWeight: 700 }}>
                                {formatTime(totals.initiated)}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 4 }}>Uninitiated</div>
                            <div style={{ fontSize: 18, fontWeight: 700 }}>
                                {formatTime(totals.uninitiated)}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 4 }}>Total</div>
                            <div style={{ fontSize: 18, fontWeight: 700 }}>
                                {formatTime(totals.total)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activities List */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {currentActivities.map((activity, index) => {
                        const isExpanded = expandedActivity === activity.activity;
                        const parseTime = (timeStr: string): number => {
                            const match = timeStr.match(/([\d.]+)\s*(min|h)/);
                            if (!match) return 0;
                            const value = parseFloat(match[1]);
                            return match[2] === "h" ? value * 60 : value;
                        };

                        const initiatedMinutes = parseTime(activity.initiated);
                        const uninitiatedMinutes = parseTime(activity.uninitiated);
                        const totalMinutes = parseTime(activity.total);
                        const initiatedPercent = totalMinutes > 0 ? (initiatedMinutes / totalMinutes) * 100 : 0;

                        return (
                            <div
                                key={`${activity.activity}-${index}`}
                                style={{
                                    background: "#FFFFFF",
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    border: "1px solid #E8E8E8",
                                    cursor: "pointer",
                                }}
                                onClick={() => toggleExpand(activity.activity)}
                            >
                                {/* Activity Header */}
                                <div style={{
                                    padding: "16px 18px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: "#1A1A1A",
                                            marginBottom: 4,
                                        }}>
                                            {activity.activity}
                                        </div>
                                        <div style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            color: "#2E7D6F",
                                        }}>
                                            {activity.total}
                                        </div>
                                    </div>
                                    <div style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        background: "#F0F7F5",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: "#2E7D6F",
                                    }}>
                                        {Math.round(initiatedPercent)}%
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div style={{
                                    height: 4,
                                    background: "#F0F0F0",
                                    margin: "0 18px 16px",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                }}>
                                    <div style={{
                                        height: "100%",
                                        width: `${initiatedPercent}%`,
                                        background: "linear-gradient(90deg, #2E7D6F, #4DB6AC)",
                                        transition: "width 0.3s ease",
                                    }} />
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div style={{
                                        padding: "0 18px 18px",
                                        borderTop: "1px solid #F0F0F0",
                                        marginTop: 8,
                                        paddingTop: 16,
                                    }}>
                                        <div style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: 16,
                                        }}>
                                            <div style={{
                                                padding: "12px",
                                                background: "#F8F9FA",
                                                borderRadius: 12,
                                            }}>
                                                <div style={{
                                                    fontSize: 11,
                                                    color: "#666",
                                                    marginBottom: 4,
                                                }}>
                                                    Initiated
                                                </div>
                                                <div style={{
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    color: "#2E7D6F",
                                                }}>
                                                    {activity.initiated}
                                                </div>
                                            </div>
                                            <div style={{
                                                padding: "12px",
                                                background: "#F8F9FA",
                                                borderRadius: 12,
                                            }}>
                                                <div style={{
                                                    fontSize: 11,
                                                    color: "#666",
                                                    marginBottom: 4,
                                                }}>
                                                    Uninitiated
                                                </div>
                                                <div style={{
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    color: "#888",
                                                }}>
                                                    {activity.uninitiated}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{
                                            marginTop: 12,
                                            padding: "12px",
                                            background: "#F0F7F5",
                                            borderRadius: 12,
                                        }}>
                                            <div style={{
                                                fontSize: 11,
                                                color: "#666",
                                                marginBottom: 4,
                                            }}>
                                                Total Time
                                            </div>
                                            <div style={{
                                                fontSize: 20,
                                                fontWeight: 700,
                                                color: "#1B5E50",
                                            }}>
                                                {activity.total}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
