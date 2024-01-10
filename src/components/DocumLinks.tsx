const DocumLinks = ({ link }: { link: string }) => {
  return (
    <div className="bg-slate-50 w-full h-52 p-4 overflow-auto text-lg">
      <a href={link} target="_blank">
        {link}
      </a>
    </div>
  );
};

export default DocumLinks;
