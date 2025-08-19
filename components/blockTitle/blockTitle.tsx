type BlockTitleType = {
  title: string;
  description: string;
};

export const BlockTitle = ({ title, description }: BlockTitleType) => {
  return (
    <>
      <div data-aos="fade-up" className="flex flex-col items-center justify-center text-center mt-10">
        <h1 className="text-secondary-foreground text-3xl font-semibold mb-2">
          {title}
        </h1>
        <h2 className="text-muted-foreground">{description}</h2>
      </div>
  
    </>
  );
};
