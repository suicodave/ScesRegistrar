export interface Date {
    date: string;
    timezone: string;
    timezone_type: string;
}

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

    year_levels: YearLevel[];
}

export interface SchoolYear {
    readonly id: number;
    name: string;
    base: number;
    is_active: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}


export interface College {
    readonly id: number;
    name: string;
    head: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: string;


}

export interface YearLevel {
    readonly id: number;
    name: string;
    department: Department;
    created_at: Date;
    updated_at: Date;
    deleted_at: string;
}
