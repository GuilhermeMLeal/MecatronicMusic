# 🎷 MecatronicMusic
Projetos dos Alunos de ADS juntamente aos alunos de Mecatrônica - Máteria IOT
### O usuário pretende iniciar uma sessão de estudo musical com uma duração específica. Este exemplo mostra como utilizar a API para iniciar uma sessão de estudo com o tempo desejado. Quando o usuário conclui sua sessão de estudo, ele pode interrompê-la para registrar o tempo dedicado.


# 📚 Código e API

## 🔧 Instruções - Projeto Local
#### Para uso da API juntamente com o Front rodando localmente, teremos que iniciar uma série de processos a partir deste repositorio

-  Clone o repositório:

   ```
   git clone https://github.com/GuilhermeMLeal/MecatronicMusic.git
    ```


Para configurar o ambiente de desenvolvimento, siga estas etapas em seu CODER:
- Entre na Pasta Raiz:

    ```
    cd codigo_projeto
    ```
- Na pasta do arquivo:

    ```
    cd Backend
    ```

-   **Crie um ambiente virtual:**

    ```
    python -m venv .env 
    ```

- Utilize o seguinte comando:

    ```
    .env\Scripts\activate
    ```

-  Logo Após, utilize:

    ```
    pip install -r requirements.txt
    ```

- **Rode Local**
    ```
    python manage.py runserver
    ```


Com essas etapas concluídas, você pode criar outro terminal e nele rodar a parte do frontend.

- Utilize o seguinte comando para entrar na outra raiz:

    ```
    cd frontend
    ```

-  Logo Após, utilize para instalação:

    ```
    Npm i
    ```

- **Front Local**
    ```
    Npm run dev
    ```


## 📄 Documentação da API

A documentação completa da API está disponível [aqui](https://www.notion.so/INTEGRA-O-IT_IA-ADS-f83b1f2e89bb4ec6ab7280778c114bc4?pvs=4).

## Uso/Exemplos

```
- Json Music
{
    "tempo_de_estudo": 0.5 (Especificando 50 minutos de estudo)
}
```


## Documentação da API

#### Criação do tempo de estudo para API 🔽

```http
  POST /espinfo
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Tempo` | `Float` | **Obrigatório**. Tempo em relação a Horas  |

#### Após o POST, irá para o GET.

#### Retorno 🔽

```http
  GET /espinfo
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `...`      | `Float` | **Obrigatório**. Estar no mesmo ENDPOINT |

#### Retorna todos os testes feitos no JSON, o tempo escolhido, data, ID, entre suas atualizações.



# 📚 Contribuições

## 👫 Usúarios

-  Integrantes

   ```
   Diego: FRONT-WEB, Integração Back e Front, FIGMA, Documentação FRONT
   Gabriel Henrique: FRONT-WEB, Documentação(Notion), Readme, 1° Protótipo
   Guilherme Martins: ARTIGO, DJANGO-API, Reformulação API, Documentação, Colection Postman.
   Matheus: FRONT-MOBILE, FIGMA, Reformulação Mobile.
   Vicenzo: FRONT-MOBILE, PYTHONANYWHERE, Reformulação Mobile e testes.
    ```
