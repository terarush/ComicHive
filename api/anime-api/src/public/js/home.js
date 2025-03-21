(async function () {
    const { pathname } = location;

    if (pathname.endsWith(".html") || pathname.endsWith(".html/")) {
        location.replace("/");
    }

    const rootElement = document.getElementById("root");
    rootElement.innerHTML = `<h1 class="text-center py-8 text-lg font-semibold">Loading...</h1>`;

    const url = pathname === "/" ? "/view-data" : pathname + "/view-data";
    const response = await fetch(url);
    const { data } = await response.json();

    if (!response.ok) {
        rootElement.innerHTML = `<h1 class="text-center py-8 text-lg font-semibold text-red-500">${response.status} ${response.statusText}</h1>`;
    } else {
        rootElement.innerHTML = `
            <div class="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
                <h2 class="text-2xl font-bold">${data.message}</h2>
                <h4 class="mt-2 text-gray-400">Deskripsi ada di response berdasarkan sumber!</h4>
                <h4 class="mt-2 text-gray-400">
                    Sering pantau bossku domain sumber sering berubah bisa update di 
                    <span class="font-mono text-green-400">"src/configs/animeConfig.ts"</span>
                </h4>
                <h4 class="mt-2 text-gray-400">
                    Untuk menghapus sumber ada di 
                    <span class="font-mono text-green-400">"src/anims/{sumber yang ingin dihapus}"</span> kemudian hapus baris kode sumber yang sudah tidak diperlukan di 
                    <span class="font-mono text-green-400">"src/index.ts"</span> dan <span class="font-mono text-green-400">"src/controllers/mainController.ts"</span>
                </h4>
                <div class="mt-6">
                    <h3 class="text-xl font-semibold">Sources :</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        ${data.sources
                          .map((source) => {
                            return `
                                <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                                    <h4 class="text-lg font-semibold">${source.title}</h4>
                                    <p class="mt-2 text-gray-600 dark:text-gray-300">
                                        <span class="font-bold">Get</span> :
                                        <a href="${source.route}" class="text-blue-500 dark:text-blue-400 underline">${source.route}</a>
                                    </p>
                                </div>
                            `;
                          })
                          .join("")}
                    </div>
                </div>
            </div>
        `;
    }
})();
