import getListings from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";

export default async function Home() {
  const listings = await getListings();

  if (listings?.length === 0) {
    return (
      <EmptyState showReset />
    )
  }

  return (
    <Container>
      <div className="pt-4 
                      grid 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4 
                      xl:grid-cols-5 
                      2xl:grid-cols-6 
                      gap-8"
      >
        {listings?.map((listing: any) => {
          return (
            <div className="text-red-400" key={listing.title}>
              <h1>{listing.title}</h1>
            </div>
          )
        })}
      </div>
    </Container>
  );
}
