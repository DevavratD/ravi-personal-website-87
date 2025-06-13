import React, { useEffect, useRef, useState, useCallback } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import worldMapData from 'world-map-geojson';

// Types
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

interface GlobeControls {
    autoRotate: boolean;
    autoRotateSpeed: number;
    enableZoom: boolean;
    enableRotate: boolean;
    enablePan: boolean;
    dispose: () => void;
}

interface ArcData {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color: string;
    intermediatePoints?: Array<{
        lat: number;
        lng: number;
        altitude: number;
    }>;
}

// Using the actual Globe type from the library
type GlobeInstance = ReturnType<typeof Globe>;

// Constants
const JOURNEY_POINTS: JourneyPoint[] = [
    {
        id: 1,
        title: "The Beginning",
        location: "Maharashtra, India",
        description: "Started my journey in the heart of India, laying the foundation for my future endeavors in technology and innovation.",
        year: "2016",
        icon: "🚀",
        coordinates: [19.7515, 75.7139],
        color: "#3B82F6"
    },
    {
        id: 2,
        title: "Business Strategy Consultant",
        location: "Texas, USA",
        description: "Worked as a Business and Strategy consultant for financial institutions, gaining deep insights into the financial sector.",
        year: "2018",
        icon: "💼",
        coordinates: [31.9686, -99.9018],
        color: "#3B82F6"
    },
    {
        id: 3,
        title: "Banking Innovation",
        location: "Ottawa, Canada",
        description: "Expanded my expertise as a Business and Strategy consultant for retail banks, focusing on digital transformation.",
        year: "2019",
        icon: "🏦",
        coordinates: [45.4215, -75.6972],
        color: "#3B82F6"
    },
    {
        id: 4,
        title: "Emerging Tech Explorer",
        location: "London, UK",
        description: "Served as an Emerging Tech consultant for consumer lenders, where my journey into Blockchain technology began.",
        year: "2020",
        icon: "🔗",
        coordinates: [51.5074, -0.1278],
        color: "#3B82F6"
    },
    {
        id: 5,
        title: "Blockchain Deep Dive",
        location: "Dubai, UAE",
        description: "Went through the blockchain rabbit hole with Polygon, immersing myself in the world of Web3 and decentralized technologies.",
        year: "2022",
        icon: "⛓️",
        coordinates: [25.2048, 55.2708],
        color: "#3B82F6"
    },
    {
        id: 6,
        title: "AI & Web3 Convergence",
        location: "Global",
        description: "Working at the intersection of AI and Web3, exploring how these technologies can reshape our digital future.",
        year: "Present",
        icon: "🌐",
        coordinates: [0, 0],  // This won't be used for a point, just for the card
        color: "#3B82F6"
    }
];

const GLOBE_COLORS = {
    ocean: '#3b82f6',
    land: '#12c454',
    border: '#166534',
    shadow: 'rgba(0,0,0,0)',
    point: '#3b82f6',
    label: '#3b82f6',
    arc: '#3b82f6',
    atmosphere: '#3b82f6'
};

const MyJourney: React.FC = () => {
    // Refs
    const globeRef = useRef<HTMLDivElement>(null);
    const globeInstanceRef = useRef<GlobeInstance | null>(null);
    const lastScrollTime = useRef(Date.now());
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    // State
    const [currentPointIndex, setCurrentPointIndex] = useState(0);
    const [globeReady, setGlobeReady] = useState(false);
    const [isMouseOverGlobe, setIsMouseOverGlobe] = useState(false);

    // Initialize globe
    useEffect(() => {
        if (!globeRef.current) return;

        const initializeGlobe = () => {
            const createPin = () => {
                const group = new THREE.Group();

                // Create a simple sphere for the location dot
                const geometry = new THREE.SphereGeometry(0.2, 16, 16);
                const material = new THREE.MeshPhongMaterial({
                    color: GLOBE_COLORS.point,
                    shininess: 100,
                    emissive: GLOBE_COLORS.point,
                    emissiveIntensity: 0.2
                });

                const dot = new THREE.Mesh(geometry, material);
                dot.position.y = 0.1;
                group.add(dot);

                // Add subtle shadow
                const shadowGeometry = new THREE.CircleGeometry(0.3, 32);
                const shadowMaterial = new THREE.MeshBasicMaterial({
                    color: '#000000',
                    transparent: true,
                    opacity: 0.2
                });
                const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
                shadow.rotation.x = -Math.PI / 2;
                shadow.position.y = 0.01;
                group.add(shadow);

                return group;
            };

            const globe = new Globe(globeRef.current!);

            // Basic globe settings
            globe.backgroundColor('rgba(0,0,0,0)');
            globe.showGlobe(true);
            globe.showAtmosphere(true);
            globe.atmosphereColor(GLOBE_COLORS.atmosphere);
            globe.atmosphereAltitude(0.15);

            // Points and labels
            globe.pointsData([]);
            globe.pointLat((d: JourneyPoint) => d.coordinates[0]);
            globe.pointLng((d: JourneyPoint) => d.coordinates[1]);
            globe.pointColor(() => GLOBE_COLORS.point);
            globe.pointAltitude(0.1);
            globe.pointRadius(0);
            globe.pointsMerge(false);
            globe.pointLabel((d: JourneyPoint) => d.location);

            // Labels
            globe.labelsData([]);
            globe.labelLat((d: JourneyPoint) => d.coordinates[0]);
            globe.labelLng((d: JourneyPoint) => d.coordinates[1]);
            globe.labelText((d: JourneyPoint) => d.location);
            globe.labelSize(1.5);
            globe.labelDotRadius(0.4);
            globe.labelColor(() => GLOBE_COLORS.label);
            globe.labelResolution(2);

            // Arcs
            globe.arcColor(() => GLOBE_COLORS.arc);
            globe.arcAltitude((d: ArcData) => {
                // Special case for India to Texas connection
                const isIndiaToTexas =
                    d.startLat === 19.7515 && d.startLng === 75.7139 &&
                    d.endLat === 31.9686 && d.endLng === -99.9018;
                return isIndiaToTexas ? 0.35 : 0.1;  // Reduced from 0.4 to 0.35
            });
            globe.arcStroke(1);
            globe.arcDashLength(0.4);
            globe.arcDashGap(0.2);
            globe.arcDashAnimateTime(2000);
            globe.arcCurveResolution(64);
            globe.arcsTransitionDuration(1000);

            // Hexagons
            globe.hexPolygonsData([]);
            globe.hexPolygonResolution(3);
            globe.hexPolygonMargin(0.7);
            globe.hexPolygonColor(() => 'rgba(59, 130, 246, 0.1)');

            // Custom objects
            globe.customLayerData([]);
            globe.customThreeObject(createPin);
            globe.customThreeObjectUpdate((obj, d: JourneyPoint) => {
                Object.assign(obj.position, globeInstanceRef.current?.getCoords(d.coordinates[0], d.coordinates[1], 0.1) || {});
            });

            customizeGlobeMaterial(globe);
            configureGlobeControls(globe);
            setInitialView(globe);

            globeInstanceRef.current = globe;
            setGlobeReady(true);
        };

        initializeGlobe();

        return () => {
            if (globeInstanceRef.current) {
                globeInstanceRef.current.controls().dispose();
            }
        };
    }, []);

    // Update points and arcs when current point changes
    useEffect(() => {
        if (!globeInstanceRef.current || !globeReady) return;

        // Show points up to current index, but exclude the global point
        const visiblePoints = JOURNEY_POINTS.slice(0, currentPointIndex + 1).filter(point => point.id !== 6);
        globeInstanceRef.current.pointsData(visiblePoints);
        globeInstanceRef.current.labelsData(visiblePoints);
        globeInstanceRef.current.customLayerData(visiblePoints);

        // Handle globe rotation for global state
        if (currentPointIndex === 5) { // Global state
            // Store current camera position before enabling rotation
            const currentPosition = globeInstanceRef.current.camera().position.clone();
            const currentTarget = globeInstanceRef.current.controls().target.clone();

            globeInstanceRef.current.controls().autoRotate = true;
            globeInstanceRef.current.controls().autoRotateSpeed = 2.0;

            // Disable user controls during global state
            globeInstanceRef.current.controls().enableZoom = false;
            globeInstanceRef.current.controls().enableRotate = false;
            globeInstanceRef.current.controls().enablePan = false;

            // Maintain the current camera position
            globeInstanceRef.current.camera().position.copy(currentPosition);
            globeInstanceRef.current.controls().target.copy(currentTarget);
        } else {
            globeInstanceRef.current.controls().autoRotate = false;
            // Re-enable user controls for other states
            globeInstanceRef.current.controls().enableZoom = true;
            globeInstanceRef.current.controls().enableRotate = true;
            globeInstanceRef.current.controls().enablePan = true;
        }

        // Create arcs between consecutive points with curved paths
        const arcs: ArcData[] = visiblePoints.slice(0, -1).map((point, i) => {
            const nextPoint = visiblePoints[i + 1];

            // Special case for India to Texas connection
            const isIndiaToTexas =
                point.coordinates[0] === 19.7515 && point.coordinates[1] === 75.7139 &&
                nextPoint.coordinates[0] === 31.9686 && nextPoint.coordinates[1] === -99.9018;

            return {
                startLat: point.coordinates[0],
                startLng: point.coordinates[1],
                endLat: nextPoint.coordinates[0],
                endLng: nextPoint.coordinates[1],
                color: GLOBE_COLORS.arc,
                intermediatePoints: [
                    {
                        lat: (point.coordinates[0] + nextPoint.coordinates[0]) / 2,
                        lng: (point.coordinates[1] + nextPoint.coordinates[1]) / 2,
                        altitude: isIndiaToTexas ? 0.33 : 0.2
                    }
                ]
            };
        });
        globeInstanceRef.current.arcsData(arcs);
    }, [currentPointIndex, globeReady]);

    // Update globe view when current point changes
    useEffect(() => {
        if (globeInstanceRef.current && globeReady) {
            updateGlobeView(currentPointIndex);
        }
    }, [currentPointIndex, globeReady]);

    // Add this after the other useEffects
    useEffect(() => {
        if (globeInstanceRef.current) {
            const controls = globeInstanceRef.current.controls();
            controls.enableZoom = false;
            controls.enableRotate = false;
            controls.enablePan = false;
        }
    }, [currentPointIndex, globeReady]);

    // Helper functions
    const updateGlobeView = (index: number) => {
        const point = JOURNEY_POINTS[index];
        globeInstanceRef.current?.pointOfView({
            lat: point.coordinates[0],
            lng: point.coordinates[1],
            altitude: 2.5
        }, 1000);
    };

    const customizeGlobeMaterial = (globe: GlobeInstance) => {
        const material = globe.globeMaterial() as THREE.MeshPhongMaterial;
        const canvas = createGlobeTexture();
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
    };

    const createGlobeTexture = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 2048;
        canvas.width = size;
        canvas.height = size;

        if (!ctx) return canvas;

        // Fill ocean
        ctx.fillStyle = GLOBE_COLORS.ocean;
        ctx.fillRect(0, 0, size, size);

        // Draw borders
        ctx.strokeStyle = GLOBE_COLORS.border;
        ctx.lineWidth = 1;

        drawWorldMap(ctx, size);

        return canvas;
    };

    const drawWorldMap = (ctx: CanvasRenderingContext2D, size: number) => {
        try {
            if (!worldMapData?.features) {
                console.error('Invalid world map data');
                return;
            }

            worldMapData.features.forEach(feature => {
                if (!feature.geometry ||
                    (feature.geometry.type !== 'Polygon' &&
                        feature.geometry.type !== 'MultiPolygon')) {
                    return;
                }

                const drawPolygon = (polygon: number[][][]) => {
                    ctx.beginPath();
                    polygon.forEach((ring) => {
                        ring.forEach((coord, coordIndex) => {
                            if (!Array.isArray(coord) || coord.length < 2) {
                                console.warn('Invalid coordinate', coord);
                                return;
                            }

                            const [x, y] = projectCoordinates(coord[0], coord[1], size);

                            if (coordIndex === 0) {
                                ctx.moveTo(x, y);
                            } else {
                                ctx.lineTo(x, y);
                            }
                        });
                    });
                    ctx.closePath();

                    ctx.fillStyle = GLOBE_COLORS.land;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    ctx.strokeStyle = GLOBE_COLORS.border;
                    ctx.stroke();
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

    const projectCoordinates = (lon: number, lat: number, size: number): [number, number] => {
        const x = (lon + 180) / 360 * size;
        const y = (90 - lat) / 180 * size;
        return [x, y];
    };

    const configureGlobeControls = (globe: GlobeInstance) => {
        const controls = globe.controls();
        controls.autoRotate = false;
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;
    };

    const setInitialView = (globe: GlobeInstance) => {
        globe.pointOfView({
            lat: JOURNEY_POINTS[0].coordinates[0],
            lng: JOURNEY_POINTS[0].coordinates[1],
            altitude: 2.5
        }, 0);
    };

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 pt-16 text-center">
                <h2 className="text-4xl font-light text-slate-800 mb-4">
                    My Journey
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto px-4">
                    A global adventure through technology, innovation, and digital transformation.
                </p>
            </div>

            <div className="absolute inset-0 flex items-center justify-center mt-20">
                {/* Left side - Globe */}
                <div className="w-1/2 relative h-[600px] flex items-center justify-center">
                    {/* Globe container */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-amber-50/30 z-0" />
                    <div
                        ref={globeRef}
                        className="w-full h-full relative z-10 flex items-center justify-center"
                    />
                </div>

                {/* Right side - Cards */}
                <div className="w-1/2 flex items-center justify-center p-8">
                    <div className="relative w-full max-w-xl mx-auto px-16">
                        {/* Navigation buttons */}
                        <button
                            onClick={() => setCurrentPointIndex(i => Math.max(i - 1, 0))}
                            disabled={currentPointIndex === 0}
                            className={`absolute -left-12 top-1/2 -translate-y-1/2 p-4 rounded-full transition-all duration-300 z-10 
                                bg-white/90 hover:bg-white shadow-lg hover:shadow-xl hover:scale-110 
                                disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                ${currentPointIndex === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            aria-label="Previous location"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setCurrentPointIndex(i => Math.min(i + 1, JOURNEY_POINTS.length - 1))}
                            disabled={currentPointIndex === JOURNEY_POINTS.length - 1}
                            className={`absolute -right-12 top-1/2 -translate-y-1/2 p-4 rounded-full transition-all duration-300 z-10 
                                bg-white/90 hover:bg-white shadow-lg hover:shadow-xl hover:scale-110 
                                disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                ${currentPointIndex === JOURNEY_POINTS.length - 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            aria-label="Next location"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Card */}
                        <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl overflow-hidden transform hover:-translate-y-1">
                            {/* Year badge */}
                            <div className="absolute top-6 right-6 z-10">
                                <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full shadow-sm">
                                    <span className="text-blue-600 font-medium tracking-wide">
                                        {JOURNEY_POINTS[currentPointIndex].year}
                                    </span>
                                </div>
                            </div>

                            {/* Location header */}
                            <div className="p-8 pb-6 border-b border-slate-100 bg-gradient-to-br from-white to-blue-50/30">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-2xl shadow-sm transform transition-transform duration-300 hover:scale-110">
                                        {JOURNEY_POINTS[currentPointIndex].icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">
                                            {JOURNEY_POINTS[currentPointIndex].location}
                                        </h3>
                                        <p className="text-slate-600 mt-1 font-medium">
                                            {JOURNEY_POINTS[currentPointIndex].title}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="p-8 bg-gradient-to-br from-white to-blue-50/20">
                                <p className="text-slate-700 leading-relaxed text-lg">
                                    {JOURNEY_POINTS[currentPointIndex].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Centered Progress Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-100">
                    {JOURNEY_POINTS.map((point, index) => (
                        <button
                            key={point.id}
                            onClick={() => setCurrentPointIndex(index)}
                            className={`relative w-2 h-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                ${currentPointIndex === index
                                    ? 'w-6 bg-blue-600'
                                    : index < currentPointIndex
                                        ? 'bg-blue-400'
                                        : 'bg-blue-200'
                                }`}
                            title={`${point.location} (${point.year})`}
                            aria-label={`Go to ${point.location}`}
                        >
                            <span className="sr-only">{point.location}</span>
                        </button>
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