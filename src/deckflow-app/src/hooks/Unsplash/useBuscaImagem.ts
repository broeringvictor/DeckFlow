import {getUnsplashInstance} from "../../api/unsplashInstance.ts";


async function buscaImagem() {
    const unsplash = await getUnsplashInstance();
    const result = await unsplash.search.getPhotos({
        query: "Brasília arquitetura",
        perPage: 1,
        orientation: "landscape",
    });

    if (result.type === 'error') {
        console.error('Erro na busca:', result.errors);
        return;
    }

    console.log('Sucesso:', result.response);
}

buscaImagem();
