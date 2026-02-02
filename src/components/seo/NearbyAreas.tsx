import Link from 'next/link';
import { type Location, getNearbyLocations } from '@/lib/constants';

type NearbyAreasProps = {
  location: Location;
  serviceSlug: string;
  serviceName: string;
};

export function NearbyAreas({ location, serviceSlug, serviceName }: NearbyAreasProps) {
  const nearbyLocations = getNearbyLocations(location);

  if (nearbyLocations.length === 0) {return null;}

  return (
    <div>
      <p className="text-sm font-medium text-neutral-700 mb-3">
        {serviceName} in nearby areas:
      </p>
      <div className="flex flex-wrap gap-2">
        {nearbyLocations.map((nearby) => (
          <Link
            key={nearby.slug}
            href={`/${serviceSlug}/${nearby.slug}`}
            className="px-3 py-1.5 text-sm bg-neutral-100 text-neutral-700 rounded-full hover:bg-primary-50 hover:text-primary-700 transition-colors"
          >
            {nearby.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
