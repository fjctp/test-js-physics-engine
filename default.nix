# Install golang and set environment variables.
{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    name = "deno-dev";
    nativeBuildInputs = [
      pkgs.deno
    ];
}
