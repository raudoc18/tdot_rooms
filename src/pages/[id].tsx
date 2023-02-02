import api from 'api';
import Image from 'next/image'
import React from 'react'

type IProps = {
  name: string,
  image: string,
  department: string,
  text: string,
}

export const getStaticProps = async ({ params }: any) => {
  const response = await api.get(`/api/rooms/${params.id}/?populate=*`);
  
  const data = response.data;

  const props: IProps = {
    name: data.data.attributes.name,
    image: `${process.env.CMS_SERVER}${data.data.attributes.image.data.attributes.formats.small.url}`,
    department: data.data.attributes.department,
    text: data.data.attributes.text,
  };

  return {
    props: {
      props
    },
  };
};

export const getStaticPaths = async () => {
  const response = await api.get('/api/rooms');
  const { data } = response;

  const paths = data.data.map((post: any) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: false };
};

type RoomProps = {
  props: IProps;
}

const Room = ({props}: RoomProps) => {
  return (
    <>
      <div className="px-4 py-4">
        <Image width={204} height={36} src="/kainrooms/rooms/assets/logo.svg" alt="htbla_kaindorf" />
      </div>
      <Image width={512} height={512} className="object-cover w-full h-60" src={props.image} alt="image" />
      <div className="px-6 pt-4 pb-6 flex flex-col grow">
        <div className="inline-flex justify-between items-center">
          <h1 className="text-3xl text-primary">{props.name}</h1>
          <Image width={40} height={40} className="h-full" src="/kainrooms/rooms/assets/informatik.svg" alt="logo" />
        </div>
        <div className="pb-8 pt-4 text-base grow">{props.text}</div>
        <div className="flex flex-col text-xs">
          <span>Du hast weitere Fragen?</span>
          <span className="text-primary">Melde dich bei unserem Lehrerteam!</span>
        </div>
      </div>
    </>
  )
}

export default Room