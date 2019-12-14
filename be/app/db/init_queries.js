const CREATE_BUSINESS_TABLE = `CREATE TABLE IF NOT EXISTS public.businesses
                                (
                                    business_id integer NOT NULL,
                                    name character varying COLLATE pg_catalog."default",
                                    address character varying COLLATE pg_catalog."default",
                                    description character varying COLLATE pg_catalog."default",
                                    CONSTRAINT businesses_pkey PRIMARY KEY (business_id)
                                )`;

const CREATE_CATEGORIES_TABLE = `CREATE TABLE IF NOT EXISTS public.categories
                                (
                                    category_id integer NOT NULL,
                                    name character varying COLLATE pg_catalog."default",
                                    CONSTRAINT categories_pkey PRIMARY KEY (category_id)
                                )`;

const CREATE_BUSINESSES_CATEGORIES_TABLE = `CREATE TABLE IF NOT EXISTS public.businesses_categories
                                            (
                                                business_id integer NOT NULL,
                                                category_id integer NOT NULL,
                                                CONSTRAINT businesses_categories_pkey PRIMARY KEY (business_id, category_id),
                                                CONSTRAINT business_id FOREIGN KEY (business_id)
                                                    REFERENCES public.businesses (business_id) MATCH SIMPLE
                                                    ON UPDATE NO ACTION
                                                    ON DELETE NO ACTION,
                                                CONSTRAINT category_id FOREIGN KEY (category_id)
                                                    REFERENCES public.categories (category_id) MATCH SIMPLE
                                                    ON UPDATE NO ACTION
                                                    ON DELETE NO ACTION
                                            )`;

const CREATE_BUSINESSES_OPENING_HOURS_TABLE = `CREATE TABLE IF NOT EXISTS public.businnesses_opening_hours
                                                (
                                                    business_id integer NOT NULL,
                                                    day integer,
                                                    start integer,
                                                    "end" integer,
                                                    CONSTRAINT businnesses_opening_hours_pkey PRIMARY KEY (business_id),
                                                    CONSTRAINT business_id FOREIGN KEY (business_id)
                                                        REFERENCES public.businesses (business_id) MATCH SIMPLE
                                                        ON UPDATE NO ACTION
                                                        ON DELETE NO ACTION
                                                )`;

const CREATE_SERVICES_TABLE = `CREATE TABLE IF NOT EXISTS public.services
                                (
                                    service_id integer NOT NULL,
                                    business_id integer,
                                    price double precision,
                                    description character varying COLLATE pg_catalog."default",
                                    duration integer,
                                    CONSTRAINT services_pkey PRIMARY KEY (service_id),
                                    CONSTRAINT business_id FOREIGN KEY (business_id)
                                        REFERENCES public.businesses (business_id) MATCH SIMPLE
                                        ON UPDATE NO ACTION
                                        ON DELETE NO ACTION
                                )`;

const CREATE_WORKERS_TABLE = `CREATE TABLE IF NOT EXISTS public.workers
                                (
                                    worker_id integer NOT NULL,
                                    business_id integer,
                                    name character varying COLLATE pg_catalog."default",
                                    mail character varying COLLATE pg_catalog."default",
                                    description character varying COLLATE pg_catalog."default",
                                    CONSTRAINT workers_pkey PRIMARY KEY (worker_id),
                                    CONSTRAINT business_id FOREIGN KEY (business_id)
                                        REFERENCES public.businesses (business_id) MATCH SIMPLE
                                        ON UPDATE NO ACTION
                                        ON DELETE NO ACTION
                                )`;

const CREATE_WORKERS_SERVICES_TABLE = `CREATE TABLE IF NOT EXISTS public.workers_services
                                        (
                                            worker_id integer NOT NULL,
                                            service_id integer NOT NULL,
                                            CONSTRAINT workers_services_pkey PRIMARY KEY (worker_id, service_id),
                                            CONSTRAINT service_id FOREIGN KEY (service_id)
                                                REFERENCES public.services (service_id) MATCH SIMPLE
                                                ON UPDATE NO ACTION
                                                ON DELETE NO ACTION,
                                            CONSTRAINT worker_id FOREIGN KEY (worker_id)
                                                REFERENCES public.workers (worker_id) MATCH SIMPLE
                                                ON UPDATE NO ACTION
                                                ON DELETE NO ACTION
                                        )`;

const CREATE_WORKERS_WORKING_HOURS = `CREATE TABLE IF NOT EXISTS public.workers_working_hours
                                        (
                                            worker_id integer NOT NULL,
                                            day integer,
                                            start integer,
                                            "end" integer,
                                            CONSTRAINT workers_working_hours_pkey PRIMARY KEY (worker_id),
                                            CONSTRAINT worker_id FOREIGN KEY (worker_id)
                                                REFERENCES public.workers (worker_id) MATCH SIMPLE
                                                ON UPDATE NO ACTION
                                                ON DELETE NO ACTION
                                        )`;

module.exports = {
    CREATE_BUSINESS_TABLE,
    CREATE_CATEGORIES_TABLE,
    CREATE_BUSINESSES_CATEGORIES_TABLE,
    CREATE_BUSINESSES_OPENING_HOURS_TABLE,
    CREATE_SERVICES_TABLE,
    CREATE_WORKERS_TABLE,
    CREATE_WORKERS_SERVICES_TABLE,
    CREATE_WORKERS_WORKING_HOURS
};