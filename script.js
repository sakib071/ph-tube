const loadVideos = async () => {
    // console.log('connected');
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
    const data = await res.json();
    const videos = data.data;
    // console.log(data);
    displayVideos(videos);
    loadCategory();
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');

    videos.forEach(video => {
        const videoCard = document.createElement('div');
        // videoCard.classList = 'videocards';

        // const showSome = video.authors[0].verified;
        // console.log(showSome);
        videoCard.innerHTML = `
        <img class="w-96 h-[200px] rounded-lg" src="${video.thumbnail}" alt="">
        <div class="flex gap-4 mt-5">
            <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}" alt="">
            <div class="space-y-1">
                <h3 class="w-[300px] text-black text-xl font-bold">${video.title}</h3>
                <div class="flex gap-2 items-center">
                    <p class="text-md text-black">${video.authors[0].profile_name}</p>
                    <img src="${video.authors[0].verified ? "./images/bluetick.svg" : ' '}"></img>
                    
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
    // console.log(categories);
    categoryBtnLoader(categories);
}

const categoryBtnLoader = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.classList = `btn btn-sm px-4 rounded border-0 bg-gray-200 text-black hover:bg-gray-200`;
        categoryBtn.innerHTML = `${category.category}`;
        categoryContainer.appendChild(categoryBtn);
    })

}

loadVideos();
