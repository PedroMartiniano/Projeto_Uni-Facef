-- CreateTable
CREATE TABLE "patrimonios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataEntrada" DATETIME NOT NULL,
    "estado" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_localizacao" INTEGER NOT NULL,
    CONSTRAINT "patrimonios_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "patrimonios_id_localizacao_fkey" FOREIGN KEY ("id_localizacao") REFERENCES "localizacoes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_categoria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "localizacoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_sala" TEXT NOT NULL
);
