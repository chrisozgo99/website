import Image from 'next/image';

export const BlogPost = (props: {
  post: any;
  newHtml: string;
  onClick: () => void;
}) => {
  const { post, newHtml, onClick } = props;

  return (
    <div>
      <div className="pb-10 sm:pb-14">
        <div className="mb-4 ml-[15%] flex flex-row items-center">
          <div className="ml-[-80px] mr-10 items-center">
            <button type="button" onClick={onClick}>
              <Image
                className=""
                loader={({ src }) => src}
                width={40}
                height={40}
                src="/assets/images/back.png"
                alt="Back"
              />
            </button>
          </div>
          <div>
            {post.primary_tag && (
              <h2 className="text-base font-bold text-[rgb(151,151,151)]">
                {post.primary_tag.name}
              </h2>
            )}
          </div>
        </div>

        <div>
          <h1 className="mx-[5%] mb-4 font-helvetica text-[32px] font-extrabold leading-8 sm:mx-[15%] sm:text-5xl sm:leading-none">
            {post.title}
          </h1>
        </div>
        <div className="mx-[5%] flex flex-row items-center sm:mx-[15%]">
          <div>
            <Image
              className="rounded-full"
              loader={({ src }) => src}
              width={52}
              height={52}
              src={post.primary_author.profile_image}
              alt={post.primary_author.name}
            />
          </div>
          <div className="ml-3">
            <div className="items-center">
              <div className="font-helvetica text-base font-bold">
                {post.primary_author.name}
              </div>
              <div className="text-sm text-[rgb(151,151,151)]">
                {new Date(
                  0,
                  new Date(post.published_at).getMonth()
                ).toLocaleString('en', { month: 'short' })}{' '}
                {new Date(post.published_at).getDate()}
                {`, ${new Date(post.published_at).getFullYear()}`}
                {` • ${post.reading_time} min read`}
              </div>
            </div>
          </div>
        </div>
      </div>
      {post.feature_image && (
        <div className="justify-center pb-14">
          <Image
            priority
            width={1200}
            height={630}
            loader={({ src }) => src}
            className="max-h-[36rem] w-full object-cover sm:mx-[5%] sm:w-[90%]"
            src={post.feature_image}
            alt={post?.feature_image_alt}
          />
        </div>
      )}
      <div
        className="mx-[5%] justify-center font-avenir sm:mx-[15%]"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: newHtml }}
        style={{}}
      />
    </div>
  );
};
