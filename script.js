const loadVideos = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const videos = data.data;
    // console.log(data);
    displayVideos(videos);
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';

    videos.forEach(video => {
        const videoCard = document.createElement('div');

        const viewDateString = video.others.posted_date;
        const viewHour = Math.floor(parseFloat(viewDateString) / 3600);
        const remainSec = parseFloat(viewDateString) % 3600;
        const viewMin = Math.floor(parseFloat(remainSec) / 60);

        videoCard.innerHTML = `
        <div class="relative">
            <img class="w-96 h-[200px] rounded-lg" src="${video.thumbnail}" alt="">
            <span class="absolute bottom-3 right-3 ${!isNaN(viewMin) ? 'bg-gray-800' : ''} text-white text-xs px-3 py-1.5 rounded-md">${!isNaN(viewHour) ? viewHour + 'hrs' : ''} ${!isNaN(viewMin) ? viewMin + 'mins ago' : ''}</span>
        </div>
        <div class="flex gap-4 mt-5">
            <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}" alt="">
            <div class="space-y-1">
                <h3 class="w-[300px] text-black text-xl font-bold">${video.title}</h3>
                <div class="flex gap-2 items-center">
                    <p class="text-md text-black">${video.authors[0].profile_name}</p>
                    <img src="${video.authors[0].verified ? "./images/bluetick.svg" : ''}"></img>
                    
                </div>
                <p class="text-md text-black">${video.others.views} views</p>
            </div>
        </div>
        `
        videoContainer.appendChild(videoCard);
    });
}

const loadCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const categories = data.data;
    console.log(categories);
    categoryBtnLoader(categories);
    loadVideos(1000);
}

const categoryBtnLoader = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        const categoryId = category.category_id;
        console.log(categoryId);
        categoryBtn.classList = `btn btn-sm px-4 rounded border-0 bg-gray-200 text-black hover:bg-gray-200`;
        categoryBtn.id = 'btn-' + categoryId;
        categoryBtn.innerHTML = `${category.category}`;
        categoryBtn.addEventListener('click', () => {
            loadVideos(categoryId);
        })
        categoryContainer.appendChild(categoryBtn);
    })

}

loadCategory();