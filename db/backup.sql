PGDMP     (    ;                y            chat    13.1    13.1     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    32801    chat    DATABASE     h   CREATE DATABASE chat WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE chat;
                postgres    false            ?            1259    32833    log    TABLE     ?   CREATE TABLE public.log (
    logid integer NOT NULL,
    message character varying,
    roomid integer NOT NULL,
    date time with time zone NOT NULL,
    username character varying NOT NULL
);
    DROP TABLE public.log;
       public         heap    postgres    false            ?            1259    32831    log_logId_seq    SEQUENCE     ?   ALTER TABLE public.log ALTER COLUMN logid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."log_logId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    206            ?            1259    32823    room    TABLE     ?   CREATE TABLE public.room (
    roomid integer NOT NULL,
    roomname character varying NOT NULL,
    roompassword character varying,
    roomtype character varying NOT NULL,
    userid integer NOT NULL
);
    DROP TABLE public.room;
       public         heap    postgres    false            ?            1259    32821    room_roomId_seq    SEQUENCE     ?   ALTER TABLE public.room ALTER COLUMN roomid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."room_roomId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    204            ?            1259    32802    session    TABLE     ?   CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);
    DROP TABLE public.session;
       public         heap    postgres    false            ?            1259    32811    users    TABLE     ?   CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying NOT NULL,
    password character varying,
    type character varying NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            ?            1259    32819    users_userid_seq    SEQUENCE     ?   ALTER TABLE public.users ALTER COLUMN userid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    201            ?          0    32833    log 
   TABLE DATA           E   COPY public.log (logid, message, roomid, date, username) FROM stdin;
    public          postgres    false    206   ?       ?          0    32823    room 
   TABLE DATA           P   COPY public.room (roomid, roomname, roompassword, roomtype, userid) FROM stdin;
    public          postgres    false    204   ?       ?          0    32802    session 
   TABLE DATA           4   COPY public.session (sid, sess, expire) FROM stdin;
    public          postgres    false    200           ?          0    32811    users 
   TABLE DATA           A   COPY public.users (userid, username, password, type) FROM stdin;
    public          postgres    false    201   ?       ?           0    0    log_logId_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."log_logId_seq"', 1, true);
          public          postgres    false    205            ?           0    0    room_roomId_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."room_roomId_seq"', 2, true);
          public          postgres    false    203            ?           0    0    users_userid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.users_userid_seq', 4, true);
          public          postgres    false    202            >           2606    32840    log log_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.log
    ADD CONSTRAINT log_pkey PRIMARY KEY (logid);
 6   ALTER TABLE ONLY public.log DROP CONSTRAINT log_pkey;
       public            postgres    false    206            <           2606    32830    room room_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (roomid);
 8   ALTER TABLE ONLY public.room DROP CONSTRAINT room_pkey;
       public            postgres    false    204            8           2606    32809    session session_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
 >   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pkey;
       public            postgres    false    200            :           2606    32818    users users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201            6           1259    32810    IDX_session_expire    INDEX     J   CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);
 (   DROP INDEX public."IDX_session_expire";
       public            postgres    false    200            ?   )   x?3?,I-.?4?44?21"=3##3ms?D?=... ??      ?       x?3?,I-.????,(M??L?4?????? W %      ?   ?   x?3s3Ϋ???N
2H??Mw.??/w??q??????VJ????LU??V?/?L??K??M?pL?????RjEAfQj?????????????E????????????Q???RFII?^N??UIQi??RAbIP??R-?]\\?_T????a???9?3?=... ??1?      ?   ?   x?5??
?0  ???????????bjat???4?8fO?!??s? ?-???2;?ʊ??????}g?v??0?p?Ƥ?\??ʛ?:[?E?<Q?r?OI??w;ؘ'|?}Z?"3.?+??b?a-?Q?5hW~?Ǽ\?oz"?^?.v     