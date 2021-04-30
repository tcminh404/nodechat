module.exports = {
    createUsers: () => {
        const query = `
        CREATE TABLE IF NOT EXISTS public.users
        (
            userid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
            username character varying COLLATE pg_catalog."default" NOT NULL,
            password character varying COLLATE pg_catalog."default",
            type character varying COLLATE pg_catalog."default" NOT NULL,
            CONSTRAINT users_pkey PRIMARY KEY (userid)
        )`
        return query;
    },

    createRoom: () => {
        const query = `
        CREATE TABLE IF NOT EXISTS public.room
        (
            roomid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
            roomname character varying COLLATE pg_catalog."default" NOT NULL,
            roompassword character varying COLLATE pg_catalog."default",
            roomtype character varying COLLATE pg_catalog."default" NOT NULL,
            userid integer NOT NULL,
            CONSTRAINT room_pkey PRIMARY KEY (roomid)
        )`
        return query;
    },

    createLog: () => {
        const query = `
        CREATE TABLE IF NOT EXISTS public.log
        (
            logid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
            message character varying COLLATE pg_catalog."default",
            roomid integer NOT NULL,
            date time with time zone NOT NULL,
            username character varying COLLATE pg_catalog."default" NOT NULL,
            CONSTRAINT log_pkey PRIMARY KEY (logid)
        )`
        return query;
    },

    createSession: () => {
        const query = `
        CREATE TABLE IF NOT EXISTS public.session
        (
            sid character varying COLLATE pg_catalog."default" NOT NULL,
            sess json NOT NULL,
            expire timestamp(6) without time zone NOT NULL,
            CONSTRAINT session_pkey PRIMARY KEY (sid)
        )`
        return query;
    },

    createMember: () => {
        const query = `
        CREATE TABLE IF NOT EXISTS public.member
        (
            id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
            roomid integer NOT NULL,
            userid integer NOT NULL,
            CONSTRAINT member_pkey PRIMARY KEY (id)
        )`
        return query;
    }
}