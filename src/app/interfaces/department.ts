export interface Department {
    readonly id: number;
    name: string;
    created_at: {
        date: string;
        timezone_type: number;
        timezone: string;
    };
    updated_at: {
        date: string;
        timezone_type: number;
        timezone: string;
    };
}
