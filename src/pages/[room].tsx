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
  const response = await api.get(`/api/rooms/${params}/?populate=*`);
  
  const data = response.data;

  const props: IProps = {
    name: data.data.attributes.name,
    image: data.data.attributes.image.data.attributes.url,
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
    <div>
      <div className="px-4 py-4">Header</div>
      <Image src={props.image} alt="image" />
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-primary">{props.name}</h1>
          <Image src={props.department} alt="logo" />
        </div>
        <div className="px-8 pt-4 pb-12 text-base">{props.text}</div>
        <div className="block">
          <span>Hast du weitere Fragen?</span>
          <span className="text-primary">Melde dich bei unserem Lehrerteam!</span>
        </div>
      </div>
    </div>
  )
}

export default Room