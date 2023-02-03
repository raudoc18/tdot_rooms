import api from 'api';
import Image from 'next/image'
import React, { useEffect } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type IProps = {
  name: string,
  image: string,
  department: string,
  text: string,
}

export const getStaticProps = async ({ params }: any) => {
  const response = await api.get(`/api/rooms/${params.id}`);
  
  const data = response.data;

  const props: IProps = {
    name: data.data.attributes.name,
    image: `${process.env.CMS_SERVER}${data.data.attributes.image.data.attributes.url}`,
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
    params: { id: post.attributes.slug.toString() },
  }));
  return { paths, fallback: false };
};

type RoomProps = {
  props: IProps;
}

const Room = ({props}: RoomProps) => {
  useEffect(() => {
    document.title = props.name;
  }, [])
  return (
    <>
      <div className="px-4 py-4">
        <Image width={204} height={36} src="/kainrooms/rooms/assets/logo.svg" alt="htbla_kaindorf" />
      </div>
      <Image width={512} height={512} className="object-cover w-full h-60" src={props.image} alt="image" />
      <div className="px-6 pt-4 pb-6 flex flex-col grow">
        <div className="inline-flex justify-between items-center">
          <h1 className="text-3xl text-primary">{props.name}</h1>
          {props.department !== 'alle' ? <Image width={40} height={40} className="h-full" src={`/kainrooms/rooms/assets/${props.department}.svg`} alt="logo" /> : null}
        </div>
        <div className="pb-8 pt-4 text-base grow">
          <ReactMarkdown>{props.text}</ReactMarkdown>
        </div>
        <div className="flex flex-col text-sm">
          <span>Du hast weitere Fragen?</span>
          <span className="text-primary">Melde dich bei unserem Lehrerteam!</span>
        </div>
      </div>
    </>
  )
}

export default Room