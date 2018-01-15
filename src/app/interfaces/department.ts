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

export interface ProcessedBy {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly created_at: string;
    readonly updated_at: string;
}

export interface Student {
    readonly id: number;
    first_name;
    middle_name;
    last_name;
    email;
    gender;
    birthdate;
    home_address;
    father_name;
    mother_name;
    department: Department;
    year_level: YearLevel;
    college: College;
    school_year: SchoolYear;
    avatar;
    created_at: Date;
    updated_at: Date;
    processed_by: ProcessedBy;

}
