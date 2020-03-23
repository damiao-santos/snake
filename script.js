let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //context renderiza o desenho que vai acontecer dentro do canvas, ao indicad o 2d ele irá tratar o arquivo como plano 2d
let box = 32;
let snake = []; //define o array snake
snake[0] = {
    x: 8 * box,
    y: 8 * box
}//define um tamanho para a snake e com isso podemos usar o for
let direction = "right"; //indica uma direção inicial com a qual será o start point para movimentação da cobra
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}// para que comida apareça de forma aleatorio terão de ser usados 2 metodos que criam numeros de forma aleatorioa.


//começo função de desenho no canvas

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //vai desenhar o retangulo onde vai acontecer o jogo, rect trabalha com 4 parametros, x e y, altura e largura
} //essa função desenha e define o canvas

/* agora será criada a snake que é um array de coordenadas em que iremos adionar um elemento e tirar o ultimo e isso fará com que ela ande e com ela trabalharemos com o for */

function criarSnake(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box); //para fazer o rect da comida, temos que criar um array pois ela deve aparecer de forma aleatoria no canvas
}

//final função de desenho no canvas


//Criar um event listener para captar as teclas utilizadas e movimentar a cobrinha

document.addEventListener("keydown", update); //o keydown pega o evento de clique no teclado e a função update será criada a seguir

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

/* função para iniciar o jogo no qual chamamos as outras dentro dela*/ 

function iniciarJogo(){
// função para fazer a cobra atravessar a tela e apareça do lado oposto
if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

//vamos criar um loop for para checar se a coordenada se choca com i que é o corpo da cobra e assim finalizr o jogo

for(i = 1; i < snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
        clearInterval(jogo);
        alert('Game Over Pressione F5 para jogar novamente');
    }
}



//chama as funções de criar o background e criar a snake
    criarBG();
    criarSnake();
    drawFood();
// as variaveis abaixo definem a posição inicial
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

//os seguintes if irão definir a direção da snake
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

// com a condicional a seguir definiremos se a cobrinha irá seguir sme crescer ou cresça caso coma a comida e a mesma apareça em outro lugar

if(snakeX != food.x || snakeY != food.y){
    //agora utilizamos o Pop para remover o item final do array
    snake.pop();
}else{
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
}



//Agora criamos um unshift para a "nova cabeça" e assim começar a criar o movimento

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100); // utilizamos setInterval de 100 ms para que o jogo seja renovado e com isso não trave





