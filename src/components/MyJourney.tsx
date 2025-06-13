import React, { useEffect, useRef, useState, useCallback } from 'react';
import Globe from 'globe.gl';
import { MapPin } from 'lucide-react';
import * as THREE from 'three';
import worldMapData from 'world-map-geojson';

// Using a more specific type for the Globe instance
type GlobeInstance = ReturnType<typeof Globe> & {
    controls: () => {
        autoRotate: boolean;
        autoRotateSpeed: number;
        enableZoom: boolean;
        enableRotate: boolean;
        enablePan: boolean;
        dispose: () => void;
    };
    pointOfView: (coords: { lat: number; lng: number; altitude: number }, transitionMs?: number) => void;
    globeMaterial: () => THREE.MeshPhongMaterial;
};

interface JourneyPoint {
    id: number;
    title: string;
    location: string;
    description: string;
    year: string;
    icon: string;
    coordinates: [number, number];
    color: string;
}

const journeyPoints: JourneyPoint[] = [
    {
        id: 1,
        title: "The Beginning",
        location: "Maharashtra, India",
        description: "Started my journey in the heart of India, laying the foundation for my future endeavors in technology and innovation.",
        year: "2016",
        icon: "🚀",
        coordinates: [19.7515, 75.7139], // Maharashtra coordinates
        color: "#3B82F6"
    },
    {
        id: 2,
        title: "Business Strategy Consultant",
        location: "Texas, USA",
        description: "Worked as a Business and Strategy consultant for financial institutions, gaining deep insights into the financial sector.",
        year: "2018",
        icon: "💼",
        coordinates: [31.9686, -99.9018], // Texas coordinates
        color: "#3B82F6"
    },
    {
        id: 3,
        title: "Banking Innovation",
        location: "Ottawa, Canada",
        description: "Expanded my expertise as a Business and Strategy consultant for retail banks, focusing on digital transformation.",
        year: "2019",
        icon: "🏦",
        coordinates: [45.4215, -75.6972], // Ottawa coordinates
        color: "#3B82F6"
    },
    {
        id: 4,
        title: "Emerging Tech Explorer",
        location: "London, UK",
        description: "Served as an Emerging Tech consultant for consumer lenders, where my journey into Blockchain technology began.",
        year: "2020",
        icon: "🔗",
        coordinates: [51.5074, -0.1278], // London coordinates
        color: "#3B82F6"
    },
    {
        id: 5,
        title: "Blockchain Deep Dive",
        location: "Dubai, UAE",
        description: "Went through the blockchain rabbit hole with Polygon, immersing myself in the world of Web3 and decentralized technologies.",
        year: "2022",
        icon: "⛓️",
        coordinates: [25.2048, 55.2708], // Dubai coordinates
        color: "#3B82F6"
    },
    {
        id: 6,
        title: "AI & Web3 Convergence",
        location: "Global",
        description: "Working at the intersection of AI and Web3, exploring how these technologies can reshape our digital future.",
        year: "Present",
        icon: "🌐",
        coordinates: [0, 0], // Center of the globe
        color: "#3B82F6"
    }
];

const MyJourney = () => {
    const globeRef = useRef<HTMLDivElement>(null);
    const globeInstanceRef = useRef<any>(null);
    const [currentPointIndex, setCurrentPointIndex] = useState(0);
    const [globeReady, setGlobeReady] = useState(false);
    const lastScrollTime = useRef(Date.now());
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    // Initialize globe
    useEffect(() => {
        if (!globeRef.current) return;

        // Initialize globe with custom styling
        const globe = new Globe(globeRef.current)
            .backgroundColor('rgba(0,0,0,0)')
            .showGlobe(true)
            .showAtmosphere(true)
            .atmosphereColor('#3b82f6')
            .atmosphereAltitude(0.15)
            .pointsData(journeyPoints)
            .pointLat((d: JourneyPoint) => d.coordinates[0])
            .pointLng((d: JourneyPoint) => d.coordinates[1])
            .pointColor((d: JourneyPoint) => d.color)
            .pointAltitude(0.1)
            .pointRadius(2)
            .pointsMerge(false)
            .hexPolygonsData([])
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.7)
            .hexPolygonColor(() => 'rgba(59, 130, 246, 0.1)')
            .pointLabel((d: JourneyPoint) => `
        <div class="bg-gradient-to-br from-blue-50 to-amber-50 p-4 rounded-lg shadow-xl">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-2xl">${d.icon}</span>
            <div>
              <div class="font-medium text-slate-900">${d.location}</div>
              <div class="text-sm text-slate-500">${d.year}</div>
            </div>
          </div>
          <div class="font-medium text-slate-900 mb-1">${d.title}</div>
          <div class="text-sm text-slate-600 max-w-xs">${d.description}</div>
        </div>
      `);

        // Customize globe material after initialization
        const material = globe.globeMaterial() as THREE.MeshPhongMaterial;

        // Create a canvas for border lines
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 2048;
        canvas.width = size;
        canvas.height = size;

        // Define color palette with alternative land color
        const colors = {
            ocean: '#3b82f6',       // Solid blue (Tailwind blue-600)
            land: '#12c454',        // Vibrant green (user provided)
            border: '#166534',      // Deep green (Tailwind green-800)
            shadow: 'rgba(0,0,0,0)' // No shadow
        };

        // Fill entire canvas with solid blue for ocean
        ctx!.fillStyle = colors.ocean;
        ctx!.fillRect(0, 0, size, size);

        // Draw country borders
        ctx!.strokeStyle = colors.border;
        ctx!.lineWidth = 1;

        // Projection function to convert lat/lon to canvas coordinates
        const projectCoordinates = (lon: number, lat: number) => {
            const x = (lon + 180) / 360 * size;
            const y = (90 - lat) / 180 * size;
            return [x, y];
        };

        // Draw borders from GeoJSON data
        const drawBorders = () => {
            try {
                if (!worldMapData || !worldMapData.features) {
                    console.error('Invalid world map data');
                    return;
                }

                worldMapData.features.forEach(feature => {
                    // Validate feature geometry
                    if (!feature.geometry ||
                        (feature.geometry.type !== 'Polygon' &&
                            feature.geometry.type !== 'MultiPolygon')) {
                        return;
                    }

                    const drawPolygon = (polygon: number[][][]) => {
                        ctx!.beginPath();
                        polygon.forEach((ring) => {
                            ring.forEach((coord, coordIndex) => {
                                // Validate coordinate
                                if (!Array.isArray(coord) || coord.length < 2) {
                                    console.warn('Invalid coordinate', coord);
                                    return;
                                }

                                const [x, y] = projectCoordinates(coord[0], coord[1]);

                                if (coordIndex === 0) {
                                    ctx!.moveTo(x, y);
                                } else {
                                    ctx!.lineTo(x, y);
                                }
                            });
                        });
                        ctx!.closePath();

                        // Fill land with theme color
                        ctx!.fillStyle = colors.land;
                        ctx!.fill();

                        // Remove shadow effect
                        ctx!.shadowBlur = 0;

                        // Draw border
                        ctx!.strokeStyle = colors.border;
                        ctx!.stroke();
                    };

                    if (feature.geometry.type === 'Polygon') {
                        drawPolygon(feature.geometry.coordinates);
                    } else if (feature.geometry.type === 'MultiPolygon') {
                        feature.geometry.coordinates.forEach(drawPolygon);
                    }
                });
            } catch (error) {
                console.error('Error drawing world map borders:', error);
            }
        };

        drawBorders();

        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        material.color = new THREE.Color(0xffffff);
        material.map = texture;
        material.transparent = true;
        material.opacity = 1;
        material.needsUpdate = true;

        // Disable auto-rotate and controls
        globe.controls().autoRotate = false;
        globe.controls().enableZoom = false;
        globe.controls().enableRotate = false;
        globe.controls().enablePan = false;

        // Set initial position
        globe.pointOfView({
            lat: journeyPoints[0].coordinates[0],
            lng: journeyPoints[0].coordinates[1],
            altitude: 2
        }, 0);

        // Store globe instance
        globeInstanceRef.current = globe;
        setGlobeReady(true);

        // Cleanup
        return () => {
            if (globeInstanceRef.current) {
                globeInstanceRef.current.controls().dispose();
            }
        };
    }, []);

    // Handle scroll events
    const handleScroll = useCallback((event: WheelEvent) => {
        event.preventDefault();

        const now = Date.now();
        if (now - lastScrollTime.current < 1000) return; // Debounce scroll events
        lastScrollTime.current = now;

        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = setTimeout(() => {
            const delta = event.deltaY;

            setCurrentPointIndex(prevIndex => {
                let newIndex;
                if (delta > 0) {
                    // Scrolling down
                    newIndex = Math.min(prevIndex + 1, journeyPoints.length - 1);
                } else {
                    // Scrolling up
                    newIndex = Math.max(prevIndex - 1, 0);
                }

                if (newIndex !== prevIndex && globeInstanceRef.current) {
                    const point = journeyPoints[newIndex];
                    globeInstanceRef.current.pointOfView({
                        lat: point.coordinates[0],
                        lng: point.coordinates[1],
                        altitude: 1.5
                    }, 1000);
                }

                return newIndex;
            });
        }, 50);
    }, []);

    // Add scroll event listener
    useEffect(() => {
        const container = globeRef.current;
        if (!container) return;

        container.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [handleScroll]);

    return (
        <section className="relative h-screen bg-gradient-to-br from-blue-50 to-amber-50 overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 pt-20 text-center">
                <h2 className="text-4xl font-light text-slate-800 mb-4">
                    My Journey
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto px-4">
                    A global adventure through technology, innovation, and digital transformation.
                    <br />
                    <span className="text-sm mt-2 block text-slate-500">Scroll to explore my journey</span>
                </p>
            </div>

            {/* Globe container with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-amber-50/30 z-0" />
            <div ref={globeRef} className="w-full h-full relative z-10" />

            {/* Journey progress */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full shadow-lg">
                    {journeyPoints.map((point, index) => (
                        <div
                            key={point.id}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentPointIndex === index
                                ? 'w-6 bg-blue-500 shadow-lg'
                                : index < currentPointIndex
                                    ? 'bg-blue-400'
                                    : 'bg-blue-200'
                                }`}
                            title={point.location}
                        />
                    ))}
                </div>
            </div>

            {/* Loading overlay */}
            {!globeReady && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center">
                    <div className="text-slate-800 text-xl">Loading visualization...</div>
                </div>
            )}
        </section>
    );
};

export default MyJourney; 