import { db } from '@/db';
import { userVideos } from '@/db/schema';

async function main() {
    const now = new Date();
    const sampleVideos = [
        {
            userId: 'test-user-123',
            prompt: 'A cinematic shot of a futuristic city at sunset with flying cars',
            videoUrl: 'https://storage.example.com/videos/video-1.mp4',
            thumbnailUrl: 'https://storage.example.com/thumbnails/thumb-1.jpg',
            settings: {
                duration: 15,
                resolution: '1080p',
                aspect_ratio: '16:9',
                camera_movement: 'pan'
            },
            status: 'completed',
            createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
        },
        {
            userId: 'test-user-123',
            prompt: 'Time-lapse of a blooming flower in a garden with butterflies',
            videoUrl: 'https://storage.example.com/videos/video-2.mp4',
            thumbnailUrl: 'https://storage.example.com/thumbnails/thumb-2.jpg',
            settings: {
                duration: 10,
                resolution: '4k',
                aspect_ratio: '9:16',
                camera_movement: 'static'
            },
            status: 'completed',
            createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000 + 8 * 60 * 1000).toISOString(),
        },
        {
            userId: 'test-user-123',
            prompt: 'Underwater scene with colorful coral reefs and tropical fish',
            videoUrl: null,
            thumbnailUrl: null,
            settings: {
                duration: 20,
                resolution: '1080p',
                aspect_ratio: '16:9',
                camera_movement: 'orbit'
            },
            status: 'processing',
            createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString(),
        },
        {
            userId: 'test-user-123',
            prompt: 'Drone footage of mountains with clouds rolling through valleys',
            videoUrl: null,
            thumbnailUrl: null,
            settings: {
                duration: 30,
                resolution: '4k',
                aspect_ratio: '16:9',
                camera_movement: 'zoom'
            },
            status: 'pending',
            createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            userId: 'test-user-123',
            prompt: 'Abstract geometric shapes morphing with neon colors on black background',
            videoUrl: null,
            thumbnailUrl: null,
            settings: {
                duration: 5,
                resolution: '720p',
                aspect_ratio: '1:1',
                camera_movement: 'static'
            },
            status: 'failed',
            createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 1 * 60 * 1000).toISOString(),
        }
    ];

    await db.insert(userVideos).values(sampleVideos);
    
    console.log('✅ User videos seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
});