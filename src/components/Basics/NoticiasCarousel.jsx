import { Card } from 'primereact/card';
import { Carousel } from 'primereact/carousel';
import { formatDate } from '@/utils/dateUtils';
import { useRouter } from 'next/navigation';
import '@/styles/NoticiasCarousel.css';

const NoticiasCarousel = ({ noticias }) => {
  const router = useRouter();

  const handleNoticiaClick = (noticia) => {
    router.push(`/noticias/${noticia}`);
  };

  const noticiaTemplate = (noticia) => {
    const header = (
      <img
        alt={noticia.Titulo}
        src={noticia.LinkFoto}
        className="w-full h-44 object-contain bg-gray-100 dark:bg-gray-800"
      />
    );

    return (
      <Card
        title={noticia.Titulo}
        subTitle={formatDate(noticia.FechaPublicacion)}
        header={header}
        className="p-2 h-full cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => handleNoticiaClick(noticia.id)}
      >
      </Card>
    );
  };

  return (
    <div className="noticias-carousel">
      <Carousel
        value={noticias.slice(0, 3)}
        numVisible={1}
        numScroll={1}
        circular
        autoplayInterval={5000}
        itemTemplate={noticiaTemplate}
      />
    </div>
  );
};

export default NoticiasCarousel;