import ArticleItem from "@/components/AtricleItem";
import HorizontalScroll from "@/components/HorizontalScroll";
import Link from "next/link";

export default function Articles() {
  return (
    <div className="">
      <div className="mb-9 flex items-center">
        <h3 className="text-slate-900 text-2xl leading-normal font-semibold">Top Articles</h3>
        <Link className="ml-auto text-violet-500 hover:text-violet-700 text-xl font-semibold" href="">See all</Link>
      </div>
      
      <HorizontalScroll className="mb-10">
        <div className="flex gap-4 sm:gap-8">
          <ArticleItem
            id="1"
            imageSrc="/images/article/jason-goodman-Oalh2MojUuk-unsplash.jpg"
            title="7 Rules of Effective Branding"
            summary="Why Branding matters for your Business"
            field="Business"
            date="20 Sep 2022"
            writer="Maria Doe"
            status="Created"
            tags={['Branding', 'Communication', 'Branding']}
          />
          <ArticleItem
            id="2"
            imageSrc="/images/article/kyle-glenn-nXt5HtLmlgE-unsplash.jpg"
            title="Research on biodiversity an..."
            summary="Lorem ipsum dolor sit amet, consectetur"
            field="Economy"
            date="20 Sep 2022"
            writer="Maria Doe"
            status="Published"
            tags={['World', 'Population']}
          />
          <ArticleItem
            id="3"
            imageSrc="/images/article/marco-oriolesi-wqLGlhjr6Og-unsplash.jpg"
            title="Close and historical ties to h..."
            summary="Lorem ipsum dolor sit amet, consectetur"
            field="Politics"
            date="20 Sep 2022"
            writer="Maria Doe"
            status="Published"
            tags={['Politics', 'Defense']}
          />
          <ArticleItem
            id="4"
            imageSrc="/images/article/jason-goodman-Oalh2MojUuk-unsplash.jpg"
            title="7 Rules of Effective Branding"
            summary="Why Branding matters for your Business"
            field="Business"
            date="20 Sep 2022"
            writer="Maria Doe"
            status="Created"
            tags={['Branding', 'Communication', 'Branding']}
          />
          <ArticleItem
            id="5"
            imageSrc="/images/article/kyle-glenn-nXt5HtLmlgE-unsplash.jpg"
            title="Research on biodiversity an..."
            summary="Lorem ipsum dolor sit amet, consectetur"
            field="Economy"
            date="20 Sep 2022"
            writer="Maria Doe"
            status="Published"
            tags={['World', 'Population']}
          />
          <ArticleItem
            id="6"
            imageSrc="/images/article/marco-oriolesi-wqLGlhjr6Og-unsplash.jpg"
            title="Close and historical ties to h..."
            summary="Lorem ipsum dolor sit amet, consectetur"
            field="Politics"
            date="20 Sep 2022"
            writer="Maria Doe"
            status="Published"
            tags={['Politics', 'Defense']}
          />
        </div>
      </HorizontalScroll>
    </div>
  )
}
